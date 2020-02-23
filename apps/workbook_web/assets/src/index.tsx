import React from "react";
import ReactDOM from "react-dom";
const _css = require("../css/app.css");
import "phoenix_html";
import { workouts } from "./data";
import { WorkoutList } from "./components";
import "./styles.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({ uri: "http://localhost:4000/api" });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="bg-gray-200 w-full flex" style={{ minHeight: "100vh" }}>
          <WorkoutList workouts={workouts} />
        </div>
      </div>
    </ApolloProvider>
  );
};

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
