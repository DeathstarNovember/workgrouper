import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";
import { NewProgram, Workout } from "../../types";
import { createProgramMutation, workoutsQuery } from "../../graphql";
import { Input } from ".";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ButtonStyles, Button } from "../../workbook_ui";
import { FaTimes } from "react-icons/fa";
import { PhasesArray } from "./PhasesArray";

interface ProgramFormProps {
  programId?: number;
  program: NewProgram;
  hideForm: () => void;
}

type ProgramData = {
  workouts: Workout[];
};

export const ProgramFormContext = React.createContext<ProgramData>({
  workouts: [],
});

const InnerForm = (props: ProgramFormProps & FormikProps<NewProgram>) => {
  const { hideForm, handleSubmit, values } = props;
  const programVariables: { program: NewProgram } = {
    program: {
      userId: 1,
      name: values.name,
      description: values.description,
      phases: values.phases.map((phase, phaseIndex) => ({
        sortOrder: phaseIndex,
        name: phase.name,
        description: phase.description,
        cycles: phase.cycles.map((cycle, cycleIndex) => ({
          sortOrder: cycleIndex,
          name: cycle.name,
          description: cycle.description,
          trainingSessions: cycle.trainingSessions.map(
            (trainingSession, trainingSessionIndex) => ({
              sortOrder: trainingSessionIndex,
              name: trainingSession.name,
              description: trainingSession.description,
              workoutId: trainingSession.workoutId,
            })
          ),
        })),
      })),
    },
  };
  const [createProgram] = useMutation(createProgramMutation, {
    variables: programVariables,
  });
  const {
    data: workoutData,
    loading: workoutsLoading,
    error: workoutsError,
  } = useQuery<ProgramData>(workoutsQuery);
  if (workoutsLoading) {
    return <div className="text-gray-900 font-bold">...Loading</div>;
  }
  if (workoutsError) {
    return (
      <div className="text-gray-900 font-bold">
        {JSON.stringify(workoutsError, null, 2)}
      </div>
    );
  }
  if (!workoutData?.workouts) {
    throw new Error("could not load workouts.");
  }
  const handleFormSubmit = async () => {
    console.warn({ programVariables });
    const createProgramResponse = await createProgram({
      variables: programVariables,
    });
    console.warn({ createProgramResponse });
  };
  const workouts = workoutData.workouts;
  return (
    <ProgramFormContext.Provider value={{ workouts }}>
      <Form className="p-3 w-full max-w-lg" onSubmit={handleSubmit}>
        <Button onClick={hideForm} buttonStyle={ButtonStyles.danger}>
          <FaTimes />
        </Button>
        <div>
          <Input labelText="Program Name" fieldName="name" />
        </div>
        <Input labelText="Program Description" fieldName="description" />
        <PhasesArray />
        <Button
          onClick={handleFormSubmit}
          buttonStyle={ButtonStyles.primary}
          text="Save Program"
        />
      </Form>
    </ProgramFormContext.Provider>
  );
};

export const ProgramForm = withFormik<ProgramFormProps, NewProgram>({
  mapPropsToValues: ({ program }) => ({ ...program }),
  validationSchema: Yup.object().shape({
    userId: Yup.number().integer(),
    name: Yup.string(),
    description: Yup.string(),
    phases: Yup.object().shape({
      sortOrder: Yup.number(),
      name: Yup.string(),
      description: Yup.string(),
      cycles: Yup.object().shape({
        sortOrder: Yup.number(),
        name: Yup.string(),
        description: Yup.string(),
        trainingSessions: Yup.object().shape({
          sortOrder: Yup.number(),
          name: Yup.string(),
          description: Yup.string(),
          workoutId: Yup.number().integer(),
        }),
      }),
    }),
  }),
  handleSubmit: () => null,
})(InnerForm);
