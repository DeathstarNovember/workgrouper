import { ordinals } from "../data";
import { diff } from "deep-object-diff";
import {
  IntervalType,
  IntensityUnit,
  IntensityType,
  Workout,
  Workset,
} from "../types";
import { toCamelCase, groupObjectsByProperty } from ".";
export const getIntervalSymbol = (
  interval: number,
  intervalType: IntervalType
) => {
  switch (Number(intervalType)) {
    case IntervalType.inclusive:
      return ` //${interval}`;
    case IntervalType.exclusive:
      return ` /${interval}`;
    case IntervalType.none:
      return "";
    default:
      return `${interval}`;
  }
};
export const getIntensitySymbol = (
  intensityUnit: IntensityUnit,
  intensityType: IntensityType
) => {
  if (intensityType === IntensityType.relative) {
    return "%1rm";
  } else {
    switch (Number(intensityUnit)) {
      case IntensityUnit.weight:
        return "lbs";
      case IntensityUnit.speed:
        return "m/s";
      default:
        return `${intensityUnit}`;
    }
  }
};

export const getOrdinalSymbol = (sortOrder: number) => {
  return ordinals[sortOrder] + ".";
};

export const areTheseThingsEqual = (things: any[]) => {
  const unorderedThings = things.map((thing) => ({
    ...thing,
    sortOrder: 0,
    id: 0,
  }));
  const thingDiffs = unorderedThings.map((thing, i, arr) =>
    diff(arr[0], thing)
  );
  const areThingsEqual = thingDiffs.every(
    (thingDiff) =>
      Object.keys(thingDiff).length === 0 && thingDiff.constructor === Object
  );
  return areThingsEqual;
};

type WorkoutWorkset = Workset & {
  exerciseName: string;
};

export const getWorkoutWorksets = (workout: Workout) => {
  const workoutWorksets: WorkoutWorkset[] = [];
  workout.workgroups.forEach((workgroup) =>
    workgroup.rounds.forEach((round) =>
      round.worksets.forEach((workset) =>
        workoutWorksets.push({
          ...workset,
          exerciseName: toCamelCase(workset.exercise.name),
        })
      )
    )
  );
  return workoutWorksets;
};
export const getWorksetsByExercise = (workout: Workout) => {
  const workoutWorksets = getWorkoutWorksets(workout);
  const worksetsByExercise: {
    [key: string]: Workset[];
  } = groupObjectsByProperty(workoutWorksets, "exerciseName");
  return worksetsByExercise;
};

export const getWorkoutExerciseNames = (workout: Workout) => {
  const workoutWorksets = getWorkoutWorksets(workout);
  const workoutExerciseNames: string[] = workoutWorksets
    .map((ww) => ww.exerciseName)
    .filter((v, i, a) => a.indexOf(v) === i);
  return workoutExerciseNames;
};
export const getWorkoutExerciseVolumes = (workout: Workout) => {
  const workoutExerciseNames = getWorkoutExerciseNames(workout);
  const worksetsByExercise = getWorksetsByExercise(workout);
  const exerciseVolumes: {
    exerciseName: string;
    volume: number;
  }[] = workoutExerciseNames.map((exerciseName) => ({
    exerciseName: exerciseName,
    volume: worksetsByExercise[exerciseName].reduce(
      (acc, workset) => acc + (workset.intensity || 0),
      0
    ),
  }));
  return exerciseVolumes;
};
