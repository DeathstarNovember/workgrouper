import React, { useState } from "react";
import ReactDOM from "react-dom";
import "phoenix_html";
import "./styles.css";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, useLazyQuery } from "@apollo/react-hooks";
import { WorkoutEditorPage, ProgramEditorPage } from "./pages";
import { Header } from "./components/layoutComponents";
import { User } from "./types";
import { HomePage } from "./pages/homePage";
const currentToken = localStorage.getItem("workbook-token");
const client = new ApolloClient({
  uri: "http://localhost:4000/api",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: currentToken ? `Bearer ${currentToken}` : ""
      }
    });
  }
});
const links = ["Home", "Workout Editor", "Program Editor"];
const layout = {
  header: {
    height: 75
  }
};
export const LayoutContext = React.createContext(layout);
type CurrentUserData = {
  authorizedUser: User;
};
type TokenData = { login: { token: string } };
const authQuery = gql`
  query GetCurrentUser($token: String!) {
    authorizedUser(token: $token) {
      id
      username
    }
  }
`;
const loginQuery = gql`
  query LogIn($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;
const App = () => {
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(0);
  const selectedLink = links[selectedLinkIndex];
  const [
    getCurrentUser,
    { data: currentUserData, loading: currentUserLoading }
  ] = useLazyQuery<CurrentUserData>(authQuery);
  const [logIn] = useLazyQuery<TokenData>(loginQuery, {
    onCompleted: data => {
      localStorage.setItem("workbook-token", data.login.token);
      window.location.reload(true);
    },
    onError: () => alert("Login failed")
  });

  const handleLogin = async () => {
    logIn({
      variables: { username: "DeathstarNovember", password: "password" }
    });
  };
  if (currentUserLoading) {
    return <div>Loading Current User</div>;
  }
  const currentUser = currentUserData?.authorizedUser;

  if (!currentUser) {
    if (currentToken) {
      getCurrentUser({ variables: { token: currentToken } });
    }
    return <button onClick={handleLogin}>Log In</button>;
  }
  return (
    <div className="" style={{ minHeight: "100vh" }}>
      <Header
        links={links}
        selectLink={setSelectedLinkIndex}
        selectedLinkIndex={selectedLinkIndex}
        currentUser={currentUser}
      />
      {selectedLink === "Program Editor" ? <ProgramEditorPage /> : null}
      {selectedLink === "Home" ? <HomePage /> : null}
      {selectedLink === "Workout Editor" ? <WorkoutEditorPage /> : null}
    </div>
  );
};

const rootElement = document.getElementById("app");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
