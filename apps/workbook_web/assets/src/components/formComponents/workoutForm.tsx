import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";
import { NewWorkout, Exercise } from "../../types";
import { FaTimes } from "react-icons/fa";
import { Input, WorkgroupsArray, FormButton } from ".";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

interface WorkoutFormProps {
  result?: boolean;
  workoutId?: number;
  workout: NewWorkout;
  hideForm: () => void;
}
const workgroupFragment = gql`
  fragment WorkgroupFragment on Workgroup {
    sortOrder
    id
    note
    rounds {
      sortOrder
      id
      interval
      intervalType
      worksets {
        sortOrder
        id
        reps
        intensity
        intensityType
        interval
        intervalType
        exercise {
          name
          intensityUnit
        }
      }
    }
  }
`;
const workoutFragment = gql`
  fragment WorkoutFragment on Workout {
    name
    description
    user {
      id
    }
  }
`;
const resultFragment = gql`
  fragment ResultFragment on Result {
    name
    description
    completedAt
    user {
      id
    }
  }
`;

const createWorkoutMutation = gql`
  mutation WorkoutCreate($workout: WorkoutInput!) {
    createWorkout(workout: $workout) {
      id
      ...WorkoutFragment
      workgroups {
        id
        ...WorkgroupFragment
      }
    }
  }
  ${workoutFragment}
  ${workgroupFragment}
`;
const createResultMutation = gql`
  mutation ResultCreate($result: ResultInput!) {
    createResult(result: $result) {
      id
      ...ResultFragment
      workgroups {
        id
        ...WorkgroupFragment
      }
    }
  }
  ${resultFragment}
  ${workgroupFragment}
`;
const exercisesQuery = gql`
  query ListExercises {
    exercises {
      id
      name
      intensityUnit
    }
  }
`;
type ExerciseData = {
  exercises: Exercise[];
};

const InnerForm = (props: WorkoutFormProps & FormikProps<NewWorkout>) => {
  const { hideForm, handleSubmit, values, result = false, workoutId } = props;
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
            exerciseId: workset.exercise.id
          }))
        }))
      }))
    }
  };
  const resultVariables = {
    result: {
      userId: 1, //TODO: set this to the result owner's id
      workoutId,
      name: values.name,
      description: values.description,
      completedAt: new Date(),
      workgroups: [...workoutVariables.workout.workgroups]
    }
  };
  const [createWorkout] = useMutation(createWorkoutMutation, {
    variables: workoutVariables
  });
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
    if (result) {
      console.warn({ resultVariables });
      const resultResponse = await createResult({
        variables: resultVariables
      });
      console.warn({ resultResponse });
    } else {
      console.warn({ workoutVariables });
      const createWorkoutResponse = await createWorkout({
        variables: workoutVariables
      });
      console.warn({ createWorkoutResponse });
    }
  };
  const exercises = exerciseData.exercises;
  return (
    <Form className="p-3 w-full max-w-lg" onSubmit={handleSubmit}>
      <button
        onClick={hideForm}
        className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded"
      >
        <FaTimes />
      </button>
      <div>
        <Input labelText="WorkoutName" fieldName="name" />
      </div>
      <Input labelText="Workout Description" fieldName="description" />
      <WorkgroupsArray exercises={exercises} />
      <FormButton
        onClick={handleFormSubmit}
        bgColor="green"
        hoverColor="green"
        text="Save Workout"
        textColor="gray"
      />
    </Form>
  );
};

// The type of props WorkoutForm receives

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
