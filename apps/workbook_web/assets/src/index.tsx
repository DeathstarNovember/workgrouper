import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "phoenix_html";
import "./styles.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import { WorkoutEditorPage, ProgramEditorPage } from "./pages";
import { Header } from "./components/layoutComponents";
import { CurrentUserData } from "./types";
import { HomePage } from "./pages/HomePage";
import { authQuery } from "./gqlAuth";
import { layout } from "./data";
const currentToken = localStorage.getItem("workbook-token");
const userLoggedIn = Boolean(currentToken);
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

const authorizedLinks = [
  { path: "/workoutEditor", name: "Workout Editor" },
  { path: "/programPlanner", name: "Program Planner" }
];

const publicLinks = [{ path: "/", name: "Home" }];

const links = currentToken
  ? [...publicLinks, ...authorizedLinks]
  : [...publicLinks];

export const LayoutContext = React.createContext(layout);

const App = () => {
  const { data: currentUserData, loading: currentUserLoading } = useQuery<
    CurrentUserData
  >(authQuery, {
    variables: { token: currentToken },
    onError: () => {
      localStorage.clear();
    }
  });

  if (currentUserLoading) {
    return <div>Loading Current User</div>;
  }
  const currentUser = currentUserData?.authorizedUser;

  return (
    <div className="" style={{ minHeight: "100vh" }}>
      <Header links={links} currentUser={currentUser} />
      {userLoggedIn ? (
        <>
          <Route path="/programPlanner" component={ProgramEditorPage} />
          <Route path="/workoutEditor" component={WorkoutEditorPage} />
        </>
      ) : null}
      <Route exact path="/" component={HomePage} />
    </div>
  );
};

const rootElement = document.getElementById("app");
ReactDOM.render(
  <ApolloProvider client={client}>
    <Router basename="/">
      <App />
    </Router>
  </ApolloProvider>,
  rootElement
);
