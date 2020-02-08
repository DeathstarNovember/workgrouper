import React from "react";
import { getIntervalSymbol } from "../../utils";
import { Workset } from "../../types";

type SingleWorksetLabelWithExerciseProps = {
  workset: Workset;
};

export const SingleWorksetLabelWithExercise: React.FC<SingleWorksetLabelWithExerciseProps> = ({
  workset
}) => {
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

type MultipleWorksetsWithoutExerciseLabelProps = {
  worksets: Workset[];
};

export const MultipleWorksetsWithoutExerciseLabel: React.FC<MultipleWorksetsWithoutExerciseLabelProps> = ({
  worksets
}) => {
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

type MultipleWorksetsWithExerciseLabelProps = {
  worksets: Workset[];
};

export const MultipleWorksetsWithExerciseLabel: React.FC<MultipleWorksetsWithExerciseLabelProps> = ({
  worksets
}) => {
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
