import React from "react";
import {
  camelCaseToTitle,
  getWorkoutExerciseVolumes,
  getWorkoutWorksets,
  getWorksetsByExercise,
} from "../utils";
import { Workout, IntensityUnit } from "../types";
import { Box } from "../workbook_ui";

type WorkoutOverviewProps = {
  workout: Workout;
  workoutIndex: number;
  clearSelectedWorkout?: (workoutIndex?: number) => void;
  selectWorkout?: (arg0: Workout, arg1: number) => void;
  isSelected?: boolean;
};

export const WorkoutOverview: React.FC<WorkoutOverviewProps> = ({
  workout,
  workoutIndex,
  clearSelectedWorkout,
  selectWorkout,
  isSelected = false,
}) => {
  const { name, description } = workout;
  const exerciseVolumes = getWorkoutExerciseVolumes(workout);
  const workoutWorksets = getWorkoutWorksets(workout);
  const worksetsByExercise = getWorksetsByExercise(workout);
  const handleSelect = () => {
    if (isSelected) {
      clearSelectedWorkout ? clearSelectedWorkout() : null;
    } else {
      selectWorkout ? selectWorkout(workout, workoutIndex) : null;
    }
  };
  return (
    <Box key={`workout${workoutIndex}`} className={`m-2`}>
      <Box onClick={() => handleSelect()} className="cursor-pointer">
        <Box className={`text-xl text-gray-100 hover:text-blue-600 underline`}>
          {name}
        </Box>
      </Box>
      {isSelected ? (
        <Box>
          <Box className="text-sm ">
            Total Load-Volume:{" "}
            {exerciseVolumes.reduce((acc, exVol) => acc + exVol.volume, 0)}
            lbs/
            {workoutWorksets.length} worksets
          </Box>
          <Box className="border-solid border-2 border-gray-600" />
          {exerciseVolumes.map((ev, evIndex) => (
            <Box
              key={`exerciseVols${evIndex}forWorkout${workoutIndex}`}
              className="text-sm"
            >
              {camelCaseToTitle(ev.exerciseName)}: {ev.volume}
              {IntensityUnit[
                worksetsByExercise[ev.exerciseName][0].exercise.intensityUnit
              ].toString() === "weight"
                ? "lbs"
                : "m/s"}
              /{worksetsByExercise[ev.exerciseName].length} worksets
            </Box>
          ))}
        </Box>
      ) : (
        <Box className="text-sm">{description}</Box>
      )}
    </Box>
  );
};
