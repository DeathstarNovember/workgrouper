import React, { useState } from "react";
import { WorkoutOverview, Workout } from ".";

export const WorkoutList = ({ workouts }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(undefined);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(undefined);
  const selectWorkout = (workout, workoutIndex) => {
    setSelectedWorkout(workout);
    setSelectedWorkoutIndex(workoutIndex);
  };
  return (
    <div className="flex">
      <div className="m-3 p-3 bg-gray-300 rounded w-1/3">
        {workouts.map((workout, workoutIndex) => (
          <WorkoutOverview
            workout={workout}
            workoutIndex={workoutIndex}
            selectWorkout={selectWorkout}
          />
        ))}
      </div>
      {selectedWorkout ? (
        <Workout
          workout={selectedWorkout}
          workoutIndex={selectedWorkoutIndex}
        />
      ) : null}
    </div>
  );
};
