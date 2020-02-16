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

  if (newWorkoutFormIsVisible) {
    return <WorkoutForm workout={newWorkout} hideForm={hideNewWorkoutForm} />;
  } else if (selectedWorkout) {
    if (workoutFormIsVisible) {
      return (
        <WorkoutForm workout={selectedWorkout} hideForm={hideWorkoutForm} />
      );
    } else {
      return (
        <WorkoutPane
          workout={selectedWorkout}
          workoutIndex={selectedWorkoutIndex}
          clearSelectedWorkout={clearSelectedWorkout}
          showForm={showWorkoutForm}
        />
      );
    }
  } else {
    return (
      <div className="flex-col w-full max-w-lg">
        <button
          onClick={() => showNewWorkoutForm()}
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
    );
  }
};
