import React, { useState } from "react";
import { WorkoutOverview, WorkoutPane } from ".";
import { FaPlus } from "react-icons/fa";
import { WorkoutForm } from "./formComponents";
import { Workout } from "../types";
import { newWorkout } from "../data";

type WorkoutListProps = {
  workouts: Workout[];
};

export const WorkoutList: React.FC<WorkoutListProps> = ({ workouts }) => {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | undefined>(
    undefined
  );
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState<
    number | undefined
  >(undefined);
  const [workoutFormIsVisible, setWorkoutFormIsVisible] = useState(false);
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

  return (
    <div className="flex flex-1">
      {workoutFormIsVisible ? (
        <WorkoutForm workout={newWorkout} hideForm={hideWorkoutForm} />
      ) : selectedWorkout ? (
        <WorkoutPane
          workout={selectedWorkout}
          workoutIndex={selectedWorkoutIndex}
          clearSelectedWorkout={clearSelectedWorkout}
        />
      ) : (
        <div className="flex-col w-full">
          <button
            onClick={() => showWorkoutForm()}
            className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 mt-3 mx-3 rounded"
          >
            <FaPlus />
          </button>
          {workouts.map((workout, workoutIndex) => (
            <WorkoutOverview
              key={`workoutOverview${workoutIndex}`}
              workout={workout}
              workoutIndex={workoutIndex}
              clearSelectedWorkout={clearSelectedWorkout}
              selectWorkout={selectWorkout}
              isSelected={workoutIndex === selectedWorkoutIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};
