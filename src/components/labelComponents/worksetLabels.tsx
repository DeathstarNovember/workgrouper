import React from "react";
import { getIntervalSymbol, getIntensitySymbol } from "../../utils";
import { Workset } from "../../types";

type SingleWorksetLabelWithExerciseProps = {
  workset: Workset;
};

export const SingleWorksetLabelWithExercise: React.FC<SingleWorksetLabelWithExerciseProps> = ({
  workset
}) => {
  const { exercise, reps, intensity, interval, intervalType } = workset;
  return (
    <div>
      {exercise.name}, 1x{reps} @{" "}
      {intensity + getIntensitySymbol(exercise.intensityUnit)}{" "}
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
  const { exercise, reps, intensity, interval, intervalType } = worksets[0];
  return (
    <div>
      {worksetCount}x{reps} @{" "}
      {intensity + getIntensitySymbol(exercise.intensityUnit)}{" "}
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
  const { exercise, reps, intensity, interval, intervalType } = worksets[0];
  return (
    <div>
      {exercise.name}, {worksetCount}x{reps} @{" "}
      {intensity + getIntensitySymbol(exercise.intensityUnit)}{" "}
      {getIntervalSymbol(interval, intervalType)}
    </div>
  );
};
