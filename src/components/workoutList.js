import React from "react";
import { Workout } from ".";

export const WorkoutList = ({ workouts }) => {
  return (
    <div className="flex">
      <div className="m-3 p-3 bg-gray-300 rounded w-1/3">
        {workouts.map((workout, workoutIndex) => {
          return (
            <Workout
              key={`workout${workoutIndex}`}
              workout={workout}
              workoutIndex={workoutIndex}
            />
          );
        })}
      </div>
      <div className="m-3 p-3 bg-gray-300 rounded w-2/3">Details</div>
    </div>
  );
};
