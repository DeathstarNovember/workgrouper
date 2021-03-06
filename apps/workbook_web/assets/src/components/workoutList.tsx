import React, { useState } from "react";
import { WorkoutOverview } from ".";
import { FaPlus } from "react-icons/fa";
import { WorkoutForm } from "./formComponents";
import { Workout } from "../types";
import { newWorkout } from "../data";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

type WorkoutListProps = {
  // workouts: Workout[];
};

const workoutsQuery = gql`
  query ListWorkouts {
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
              name
              intensityUnit
            }
          }
        }
      }
    }
  }
`;

export const WorkoutList: React.FC<WorkoutListProps> = () => {
  const { data, loading, error, ...rest } = useQuery(workoutsQuery);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>(
    undefined
  );
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState<
    number | undefined
  >(undefined);
  const [workoutFormIsVisible, setWorkoutFormIsVisible] = useState(false);
  const [newWorkoutFormIsVisible, setNewWorkoutFormIsVisible] = useState(false);
  const selectWorkout = (workout: Workout, workoutIndex: number) => {
    setSelectedWorkout(workout);
    setSelectedWorkoutIndex(workoutIndex);
  };
  const clearSelectedWorkout = () => {
    setSelectedWorkout(undefined);
    setSelectedWorkoutIndex(undefined);
  };
  const showWorkoutForm = () => {
    setWorkoutFormIsVisible(true);
  };
  const hideWorkoutForm = () => {
    setWorkoutFormIsVisible(false);
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
    return <div className="text-lg">{error}</div>;
  }

  if (newWorkoutFormIsVisible) {
    return <WorkoutForm workout={newWorkout} hideForm={hideNewWorkoutForm} />;
  } else {
    return (
      <div className="flex-col w-full max-w-lg">
        <button
          onClick={() => showNewWorkoutForm()}
          className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 mt-3 mx-3 rounded"
        >
          <FaPlus />
        </button>
        {data?.workouts.map((workout: Workout, workoutIndex: number) => (
          <WorkoutOverview
            key={`workoutOverview${workoutIndex}`}
            workout={workout}
            workoutIndex={workoutIndex}
          />
        ))}
      </div>
    );
  }
};
