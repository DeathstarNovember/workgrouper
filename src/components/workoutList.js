import React, { useState } from "react";
import { WorkoutOverview, Workout } from ".";

export const WorkoutList = ({ workouts }) => {
  const [selectedWorkout, setSelectedWorkout] = useState(undefined);
  const [selectedWorkoutIndex, setSelectedWorkoutIndex] = useState(undefined);
  const selectWorkout = (workout, workoutIndex) => {
    if (workout) {
      setSelectedWorkout(workout);
      setSelectedWorkoutIndex(workoutIndex);
    } else {
      setSelectedWorkout(undefined);
      setSelectedWorkoutIndex(undefined);
    }
  };
  return (
    <div className="flex flex-1">
      {selectedWorkout ? (
        <Workout
          workout={selectedWorkout}
          workoutIndex={selectedWorkoutIndex}
          selectWorkout={selectWorkout}
        />
      ) : (
        <div className="flex-col w-full">
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
