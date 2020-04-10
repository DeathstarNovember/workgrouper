import { gql } from "apollo-boost";

export const workgroupFragment = gql`
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

export const workoutFragment = gql`
  fragment WorkoutFragment on Workout {
    name
    description
    user {
      id
    }
  }
`;

export const resultFragment = gql`
  fragment ResultFragment on Result {
    name
    description
    completedAt
    user {
      id
    }
  }
`;

export const createWorkoutMutation = gql`
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

export const updateWorkoutMutation = gql`
  mutation UpdateWorkout($id: ID, $workout: WorkoutInput!) {
    workoutUpdate(id: $id, workout: $workout) {
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

export const deleteWorkoutMutation = gql`
  mutation WorkoutDelete($id: ID) {
    deleteWorkout(id: $id) {
      id
    }
  }
  ${workoutFragment}
  ${workgroupFragment}
`;

export const createResultMutation = gql`
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

export const exercisesQuery = gql`
  query ListExercises {
    exercises {
      id
      name
      intensityUnit
    }
  }
`;
