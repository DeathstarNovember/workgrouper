import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";
import { NewWorkout, Exercise } from "../../types";
import { createWorkoutMutation, exercisesQuery } from "../../graphql";
import { Input, WorkgroupsArray } from ".";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ButtonStyles, Button } from "../../workbook_ui";
import { FaTimes } from "react-icons/fa";

interface WorkoutFormProps {
  workoutId?: number;
  workout: NewWorkout;
  hideForm: () => void;
}

type ExerciseData = {
  exercises: Exercise[];
};

export const WorkoutFormContext = React.createContext<ExerciseData>({
  exercises: [],
});

const InnerForm = (props: WorkoutFormProps & FormikProps<NewWorkout>) => {
  const { hideForm, handleSubmit, values } = props;
  const workoutVariables = {
    workout: {
      userId: 1,
      name: values.name,
      description: values.description,
      completedAt: new Date(),
      workgroups: values.workgroups.map((workgroup, workgroupIndex) => ({
        sortOrder: workgroupIndex,
        note: workgroup.note,
        rounds: workgroup.rounds.map((round, roundIndex) => ({
          sortOrder: roundIndex,
          interval: Number(round.interval),
          intervalType: Number(round.intervalType),
          worksets: round.worksets.map((workset, worksetIndex) => ({
            sortOrder: worksetIndex,
            reps: Number(workset.reps),
            intensity: Number(workset.intensity),
            intensityType: Number(workset.intensityType),
            interval: Number(workset.interval),
            intervalType: Number(workset.intervalType),
            exerciseId: workset.exercise.id,
          })),
        })),
      })),
    },
  };
  const [createWorkout] = useMutation(createWorkoutMutation, {
    variables: workoutVariables,
  });
  const {
    data: exerciseData,
    loading: exercisesLoading,
    error: exercisesError,
  } = useQuery<ExerciseData>(exercisesQuery);
  if (exercisesLoading) {
    return <div className="text-gray-900 font-bold">...Loading</div>;
  }
  if (exercisesError) {
    return (
      <div className="text-gray-900 font-bold">
        {JSON.stringify(exercisesError, null, 2)}
      </div>
    );
  }
  if (!exerciseData?.exercises) {
    throw new Error("could not load exercises.");
  }
  const handleFormSubmit = async () => {
    console.warn({ workoutVariables });
    const createWorkoutResponse = await createWorkout({
      variables: workoutVariables,
    });
    console.warn({ createWorkoutResponse });
  };
  const exercises = exerciseData.exercises;
  return (
    <WorkoutFormContext.Provider value={{ exercises }}>
      <Form className="p-3 w-full max-w-lg" onSubmit={handleSubmit}>
        <Button onClick={hideForm} buttonStyle={ButtonStyles.danger}>
          <FaTimes />
        </Button>
        <div>
          <Input labelText="WorkoutName" fieldName="name" />
        </div>
        <Input labelText="Workout Description" fieldName="description" />
        <WorkgroupsArray />
        <Button
          onClick={handleFormSubmit}
          buttonStyle={ButtonStyles.primary}
          text="Save Workout"
        />
      </Form>
    </WorkoutFormContext.Provider>
  );
};

export const WorkoutForm = withFormik<WorkoutFormProps, NewWorkout>({
  mapPropsToValues: ({ workout }) => ({ ...workout }),
  validationSchema: Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    workgroups: Yup.array().of(
      Yup.object().shape({
        sortOrder: Yup.number().required(),
        note: Yup.string(),
        rounds: Yup.array().of(
          Yup.object().shape({
            sortOrder: Yup.number().required(),
            interval: Yup.number().required(),
            intervalType: Yup.number().required(),
            worksets: Yup.array().of(
              Yup.object().shape({
                reps: Yup.number()
                  .integer("must be a number")
                  .min(1, "must be positive")
                  .required("volume is required"),
                intensityType: Yup.number().required(),
                intensity: Yup.number()
                  .integer("must be a number")
                  .min(1, "must be positive")
                  .required("intensity is required"),
                intervalType: Yup.number().required(
                  "The type of time interval is not specified for this set."
                ),
                interval: Yup.number().required(
                  "The time interval is not specified for this set."
                ),
              })
            ),
          })
        ),
      })
    ),
  }),
  handleSubmit: () => null,
})(InnerForm);
