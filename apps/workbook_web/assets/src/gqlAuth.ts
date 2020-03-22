import { gql } from "apollo-boost";

export const authQuery = gql`
  query GetCurrentUser($token: String!) {
    authorizedUser(token: $token) {
      id
      username
    }
  }
`;
export const loginQuery = gql`
  query LogIn($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
