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
};

export const WorkoutOverview: React.FC<WorkoutOverviewProps> = ({
  workout,
  workoutIndex,
}) => {
  const exerciseVolumes = getWorkoutExerciseVolumes(workout);
  const workoutWorksets = getWorkoutWorksets(workout);
  const worksetsByExercise = getWorksetsByExercise(workout);
  if (exerciseVolumes.length) {
    return (
      <Box key={`workout${workoutIndex}`} className={`my-2`}>
        <Box>
          <Box className="text-sm mb-4">
            <Box>Total Load-Volume: </Box>
            <Box>
              {exerciseVolumes.reduce((acc, exVol) => acc + exVol.volume, 0)}
              lbs in {workoutWorksets.length} worksets
            </Box>
          </Box>
          {exerciseVolumes.map((ev, evIndex) => {
            const workoutKey = `exerciseVols${evIndex}forWorkout${workoutIndex}`;
            const worksetsQty = worksetsByExercise[ev.exerciseName].length;
            const intensityUnit =
              IntensityUnit[
                worksetsByExercise[ev.exerciseName][0].exercise.intensityUnit
              ].toString() === "weight"
                ? "lbs"
                : "m/s";
            const exerciseTitle = camelCaseToTitle(ev.exerciseName);
            return (
              <Box key={workoutKey} className="text-sm mb-4">
                <Box>{exerciseTitle}:</Box>
                <Box>{worksetsQty} sets</Box>
                <Box>
                  {ev.volume}
                  {intensityUnit} {"("}
                  {(ev.volume / worksetsQty).toFixed()}
                  {"avg/set)"}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  } else {
    return null;
  }
};
