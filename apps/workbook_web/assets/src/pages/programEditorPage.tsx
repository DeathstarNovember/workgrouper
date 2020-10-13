import React, { useState, useContext } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Program } from "../types";
import { FaPlus } from "react-icons/fa";
import { LayoutContext } from "..";
import { ProgramPane } from "../components";
import { ProgramForm } from "../components/formComponents/ProgramForm";
import { newProgram } from "../data";

const programEditorQuery = gql`
  query ProgramEditor {
    programs {
      id
      description
      name
      phases {
        id
        sortOrder
        name
        description
        cycles {
          id
          sortOrder
          name
          description
          trainingSessions {
            id
            sortOrder
            name
            description
            sortOrder
            workout {
              id
              name
              description
              workgroups {
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
                      id
                      name
                      intensityUnit
                    }
                  }
                }
              }
            }
          }
        }
      }
      user {
        id
        username
      }
    }
  }
`;
const backgroundGradient = "linear-gradient(to top, #414345, #232526)";
export const ProgramEditorPage = () => {
  const layout = useContext(LayoutContext);
  const { data, loading, error } = useQuery(programEditorQuery);
  const [selectedProgram, setSelectedProgram] = useState<Program | undefined>(
    undefined
  );
  const [selectedProgramIndex, setSelectedProgramIndex] = useState<
    number | undefined
  >(undefined);
  const [newProgramFormIsVisible, setNewProgramFormIsVisible] = useState(false);
  const selectProgram = (program: Program, programIndex: number) => {
    setSelectedProgram(program);
    setSelectedProgramIndex(programIndex);
  };
  const clearSelectedProgram = () => {
    setSelectedProgram(undefined);
    setSelectedProgramIndex(undefined);
  };
  const showNewProgramForm = () => {
    setNewProgramFormIsVisible(true);
  };
  const hideNewProgramForm = () => {
    setNewProgramFormIsVisible(false);
  };
  if (loading) {
    return <div className="text-lg">...Loading</div>;
  }
  if (error) {
    return <div className="text-lg">{JSON.stringify(error, null, 2)}</div>;
  }
  return (
    <div
      className="flex flex-1 bg-gray-600 "
      style={{
        minHeight: `calc(100vh - ${layout.header.height}px)`,
        background: backgroundGradient,
      }}
    >
      {!selectedProgram ? (
        <div className="bg-gray-500" style={{ width: 500 }}>
          <div className="flex-col w-full max-w-lg">
            <button
              onClick={() => showNewProgramForm()}
              className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 mt-6 mx-3 rounded"
            >
              <FaPlus />
            </button>
            {data ? (
              data.programs.map((program: Program, programIndex: number) => (
                <div
                  className="text-2xl font-bold m-2 p-2"
                  key={`programOverview${programIndex}`}
                  onClick={() => selectProgram(program, programIndex)}
                >
                  {program.name}
                </div>
              ))
            ) : (
              <div className="text-gray-900 font-bold">No Programs Loaded</div>
            )}
          </div>
        </div>
      ) : null}
      <div className="w-full">
        {newProgramFormIsVisible ? (
          <ProgramForm program={newProgram} hideForm={hideNewProgramForm} />
        ) : selectedProgram ? (
          <ProgramPane
            program={selectedProgram}
            clearSelectedProgram={clearSelectedProgram}
            programIndex={selectedProgramIndex}
          />
        ) : null}
      </div>
    </div>
  );
};
