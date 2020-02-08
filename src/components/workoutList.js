import React, { useState } from "react";
import { WorkoutOverview, Workout } from ".";
import { FaPlus } from "react-icons/fa";
import { WorkoutForm } from "./formComponents";

export const WorkoutList = ({ workouts }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(undefined);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(undefined);
  const [workoutFormIsVisible, setWorkoutFormIsVisible] = useState(false);
  const selectWorkout = (workout, workoutIndex) => {
    if (workout) {
      setSelectedWorkout(workout);
      setSelectedWorkoutIndex(workoutIndex);
    } else {
      setSelectedWorkout(undefined);
      setSelectedWorkoutIndex(undefined);
    }
  };
  const showWorkoutForm = () => {
    setWorkoutFormIsVisible(true);
  };

  return (
    <div className="flex flex-1">
      {workoutFormIsVisible ? (
        <WorkoutForm setWorkoutFormIsVisible={setWorkoutFormIsVisible} />
      ) : selectedWorkout ? (
        <Workout
          workout={selectedWorkout}
          workoutIndex={selectedWorkoutIndex}
          selectWorkout={selectWorkout}
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
              selectWorkout={selectWorkout}
              isSelected={workoutIndex === selectedWorkoutIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
};
