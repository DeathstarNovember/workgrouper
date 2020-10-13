import { gql } from "apollo-boost";

export const deleteProgramMutation = gql`
  mutation WorkoutDelete($id: ID) {
    deleteWorkout(id: $id) {
      id
    }
  }
`;

export const phaseFragment = gql`
  fragment PhaseFragment on Phase {
    sortOrder
    id
    name
    description
    user {
      id
    }
    cycles {
      id
      name
      sortOrder
      description
      trainingSessions {
        id
        sortOrder
        name
        description
        workout {
          id
        }
        result {
          id
        }
      }
    }
  }
`;

export const programFragment = gql`
  fragment ProgramFragment on Program {
    name
    description
    user {
      id
    }
  }
`;

export const createProgramMutation = gql`
  mutation ProgramCreate($program: ProgramInput!) {
    createProgram(program: $program) {
      id
      ...ProgramFragment
      phases {
        id
        ...PhaseFragment
      }
    }
  }
  ${programFragment}
  ${phaseFragment}
`;

export const workoutsQuery = gql`
  query ListWorkouts {
    workouts {
      id
      name
      description
    }
  }
`;
