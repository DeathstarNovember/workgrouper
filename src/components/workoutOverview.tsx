import React from "react";
import {
  groupObjectsByProperty,
  camelCaseToTitle,
  toCamelCase
} from "../utils";
import { Workout, Workset } from "../types";

type WorkoutOverviewProps = {
  workout: Workout;
  workoutIndex: number;
  clearSelectedWorkout: () => void;
  selectWorkout: (arg0: Workout, arg1: number) => void;
  isSelected: boolean;
};

export const WorkoutOverview: React.FC<WorkoutOverviewProps> = ({
  workout,
  workoutIndex,
  clearSelectedWorkout,
  selectWorkout,
  isSelected = false
}) => {
  const { name, description } = workout;
  type WorkoutWorkset = Workset & {
    exerciseName: string;
  };
  const workoutWorksets: WorkoutWorkset[] = [];
  workout.workgroups.forEach(workgroup =>
    workgroup.rounds.forEach(round =>
      round.worksets.forEach(workset =>
        workoutWorksets.push({
          ...workset,
          exerciseName: toCamelCase(workset.exercise.name)
        })
      )
    )
  );

  const worksetsByExercise: {
    [key: string]: Workset[];
  } = groupObjectsByProperty(workoutWorksets, "exerciseName");

  const workoutExerciseNames: string[] = workoutWorksets
    .map(ww => ww.exerciseName)
    .filter((v, i, a) => a.indexOf(v) === i);

  const exerciseVolumes: {
    exerciseName: string;
    volume: number;
  }[] = workoutExerciseNames.map(exerciseName => ({
    exerciseName: exerciseName,
    volume: worksetsByExercise[exerciseName].reduce(
      (acc, workset) => acc + (workset.intensity || 0),
      0
    )
  }));
  const handleSelect = () => {
    if (isSelected) {
      clearSelectedWorkout();
    } else {
      selectWorkout(workout, workoutIndex);
    }
  };
  return (
    <div
      key={`workout${workoutIndex}`}
      className={`m-3 p-3 bg-${isSelected ? "blue" : "gray"}-400 rounded`}
    >
      <div onClick={() => handleSelect()} className="cursor-pointer">
        <div
          className={`py-1 text-xl text-gray-900 hover:text-blue-600 underline`}
        >
          {name}
        </div>
      </div>
      {isSelected ? (
        <div>
          <div className="text-sm ">
            Total Load-Volume:{" "}
            {exerciseVolumes.reduce((acc, exVol) => acc + exVol.volume, 0)}
            lbs/
            {workoutWorksets.length} worksets
          </div>
          <div className="border-solid border-2 border-gray-600" />
          {exerciseVolumes.map((ev, evIndex) => (
            <div
              key={`exerciseVols${evIndex}forWorkout${workoutIndex}`}
              className="text-sm"
            >
              {camelCaseToTitle(ev.exerciseName)}: {ev.volume}
              {worksetsByExercise[ev.exerciseName][0].exercise.intensityUnit}/
              {worksetsByExercise[ev.exerciseName].length} worksets
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm">{description}</div>
      )}
    </div>
  );
};
