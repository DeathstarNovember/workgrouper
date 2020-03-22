import React, { useState, useContext } from "react";
import { WorkoutOverview, WorkoutPane } from "../components";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { Workout } from "../types";
import { newWorkout } from "../data";
import { FaPlus } from "react-icons/fa";
import { WorkoutForm } from "../components/formComponents";
import { LayoutContext } from "..";

const workoutEditorQuery = gql`
  query WorkoutEditor {
    exercises {
      id
      name
      intensityUnit
    }
    workouts {
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
      results {
        id
      }
    }
  }
`;

export const WorkoutEditorPage = () => {
  const layout = useContext(LayoutContext);
  const { data, loading, error } = useQuery(workoutEditorQuery);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>(
    undefined
  );
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState<
    number | undefined
  >(undefined);
  const [newWorkoutFormIsVisible, setNewWorkoutFormIsVisible] = useState(false);
  const selectWorkout = (workout: Workout, workoutIndex: number) => {
    setSelectedWorkout(workout);
    setSelectedWorkoutIndex(workoutIndex);
  };
  const clearSelectedWorkout = () => {
    setSelectedWorkout(undefined);
    setSelectedWorkoutIndex(undefined);
  };
  const showNewWorkoutForm = () => {
    setNewWorkoutFormIsVisible(true);
  };
  const hideNewWorkoutForm = () => {
    setNewWorkoutFormIsVisible(false);
  };
  if (loading) {
    return <div className="text-lg">...Loading</div>;
  }
  if (error) {
    return <div className="text-lg">{JSON.stringify(error, null, 2)}</div>;
  }
  return (
    <div
      className="flex flex-1"
      style={{ minHeight: `calc(100vh - ${layout.header.height}px)` }}
    >
      <div className="max-w-500 bg-gray-500">
        <div className="flex-col w-full max-w-lg">
          <button
            onClick={() => showNewWorkoutForm()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 mt-6 mx-3 rounded"
          >
            <FaPlus />
          </button>
          {data ? (
            data.workouts.map((workout: Workout, workoutIndex: number) => (
              <WorkoutOverview
                key={`workoutOverview${workoutIndex}`}
                workout={workout}
                workoutIndex={workoutIndex}
                clearSelectedWorkout={clearSelectedWorkout}
                selectWorkout={selectWorkout}
                isSelected={workoutIndex === selectedWorkoutIndex}
              />
            ))
          ) : (
            <div className="text-gray-900 font-bold">No Workouts Loaded</div>
          )}
        </div>
      </div>
      <div className="">
        {newWorkoutFormIsVisible ? (
          <WorkoutForm workout={newWorkout} hideForm={hideNewWorkoutForm} />
        ) : selectedWorkout ? (
          <WorkoutPane
            workout={selectedWorkout}
            clearSelectedWorkout={clearSelectedWorkout}
            workoutIndex={selectedWorkoutIndex}
          />
        ) : null}
      </div>
    </div>
  );
};
