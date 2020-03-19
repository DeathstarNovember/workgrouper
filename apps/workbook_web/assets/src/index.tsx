import React, { useState } from "react";
import ReactDOM from "react-dom";
import "phoenix_html";
import "./styles.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { WorkoutEditorPage } from "./pages";
import { Header } from "./components/layoutComponents";

const client = new ApolloClient({ uri: "http://localhost:4000/api" });
const links = ["Home", "Workout Editor", "Program Editor"];

const App = () => {
  const [selectedLinkIndex, setSelectedLinkIndex] = useState(0);
  const selectedLink = links[selectedLinkIndex];
  return (
    <ApolloProvider client={client}>
      <div className="" style={{ minHeight: "100vh" }}>
        <Header
          links={links}
          selectLink={setSelectedLinkIndex}
          selectedLinkIndex={selectedLinkIndex}
        />
        {selectedLink === "Program Editor" ? (
          <div className="text-green-800">Program Editor</div>
        ) : null}
        {selectedLink === "Home" ? (
          <div className="text-purple-800">Home</div>
        ) : null}
        {selectedLink === "Workout Editor" ? <WorkoutEditorPage /> : null}
      </div>
    </ApolloProvider>
  );
};

const rootElement = document.getElementById("app");
ReactDOM.render(<App />, rootElement);
