import React from "react";
import { getIntervalSymbol } from "../../utils";

export const SingleWorksetLabelWithExercise = ({ workset }) => {
  const {
    exercise,
    reps,
    intensity,
    intensityUnit,
    interval,
    intervalType
  } = workset;
  return (
    <div>
      {exercise.name}, 1x{reps} @ {intensity + intensityUnit}{" "}
      {getIntervalSymbol(interval, intervalType)}
    </div>
  );
};

export const MultipleWorksetsWithoutExerciseLabel = ({ worksets }) => {
  const worksetCount = worksets.length;
  const {
    reps,
    intensity,
    intensityUnit,
    interval,
    intervalType
  } = worksets[0];
  return (
    <div>
      {worksetCount}x{reps} @ {intensity + intensityUnit}{" "}
      {getIntervalSymbol(interval, intervalType)}
    </div>
  );
};

export const MultipleWorksetsWithExerciseLabel = ({ worksets }) => {
  const worksetCount = worksets.length;
  const {
    exercise,
    reps,
    intensity,
    intensityUnit,
    interval,
    intervalType
  } = worksets[0];
  return (
    <div>
      {exercise.name}, {worksetCount}x{reps} @ {intensity + intensityUnit}{" "}
      {getIntervalSymbol(interval, intervalType)}
    </div>
  );
};
