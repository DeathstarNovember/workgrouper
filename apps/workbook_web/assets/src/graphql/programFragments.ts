import { gql } from "apollo-boost";

export const deleteProgramMutation = gql`
  mutation WorkoutDelete($id: ID) {
    deleteWorkout(id: $id) {
      id
    }
  }
`;
