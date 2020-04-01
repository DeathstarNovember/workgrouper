import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";
import { Exercise, Workout } from "../../types";
import { FaTimes } from "react-icons/fa";
import { WorkgroupsArray, FormButton } from ".";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { createResultMutation, exercisesQuery } from "../../graphql";

interface ResultFormProps {
  workoutId?: number;
  workout: Workout;
  hideForm: () => void;
}

type ExerciseData = {
  exercises: Exercise[];
};

const InnerForm = (props: ResultFormProps & FormikProps<Workout>) => {
  const { hideForm, handleSubmit, values, workoutId } = props;
  const resultVariables = {
    workout: {
      userId: 1, //TODO: set this to the result owner's id
      workoutId,
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
            exerciseId: workset.exercise.id
          }))
        }))
      }))
    }
  };
  const [createResult] = useMutation(createResultMutation);
  const {
    data: exerciseData,
    loading: exercisesLoading,
    error: exercisesError
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
    console.warn({ resultVariables });
    const resultResponse = await createResult({
      variables: resultVariables
    });
    console.warn({ resultResponse });
  };
  const exercises = exerciseData.exercises;
  return (
    <Form className="p-3 w-full max-w-lg" onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <div className="text-gray-900 font-bold text-lg">New Result</div>
        <FormButton
          onClick={hideForm}
          bgColor="gray"
          hoverColor="red"
          text="Cancel"
          textColor="gray"
        />
      </div>
      <WorkgroupsArray exercises={exercises} />
      <div className="flex justify-between">
        <FormButton
          onClick={handleFormSubmit}
          bgColor="green"
          hoverColor="green"
          text="Save Result"
          textColor="gray"
        />
        <FormButton
          onClick={hideForm}
          bgColor="gray"
          hoverColor="red"
          text="Cancel"
          textColor="gray"
        />
      </div>
    </Form>
  );
};

// The type of props WorkoutForm receives

export const ResultForm = withFormik<ResultFormProps, Workout>({
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
                )
              })
            )
          })
        )
      })
    )
  }),
  handleSubmit: () => null
})(InnerForm);
