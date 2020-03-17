import React from "react";
import ReactDOM from "react-dom";
import "phoenix_html";
// import { workouts } from "./data";
import { WorkoutList } from "./components";
import "./styles.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

const client = new ApolloClient({ uri: "http://localhost:4000/api" });

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <div className="" style={{ minHeight: "100vh" }}>
          <div className="flex w-full bg-gray-200" style={{ height: "75px" }}>
            <div className="flex items-center justify-around">
              <div className="mx-4 rounded-full h-16 w-16 flex items-center justify-center bg-gray-700" />
              <div className="mr-2 text mr-5">Link 1</div>
              <div className="mr-2 text mr-5">Link 2</div>
              <div className="text">Link 3</div>
            </div>
            <div className="flex flex-1 justify-end">
              <div className="flex flex-col h-full justify-center mr-3">
                <input
                  className="rounded-full py-2 px-4"
                  name="search"
                  placeholder="search"
                />
              </div>
            </div>
          </div>
          <div
            className="w-1/4 bg-gray-500"
            style={{ minHeight: "calc(100vh - 75px)" }}
          >
            {/* <WorkoutList workouts={workouts} /> */}
            <WorkoutList />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
