import React from "react";
import ReactDOM from "react-dom";
import { workouts } from "./data";
import { WorkoutList } from "./components";
import "./styles.css";

const App = () => {
  return (
    <div className="App">
      <div
        className="bg-gray-200 w-full m-h-screen flex"
        style={{ minHeight: "100vh" }}
      >
        <WorkoutList workouts={workouts} />
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
