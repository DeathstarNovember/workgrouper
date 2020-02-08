import React from "react";
import {
  groupObjectsByProperty,
  camelCaseToTitle,
  toCamelCase
} from "../utils";

export const WorkoutOverview = ({ workout, workoutIndex, selectWorkout }) => {
  const { name, description } = workout;
  let workoutWorksets = [];
  workout.workgroups.forEach(workgroup =>
    workgroup.rounds.forEach(round =>
      round.worksets.forEach(workset =>
        workoutWorksets.push({
          exercise: { ...workset.exercise },
          ...workset,
          exerciseName: toCamelCase(workset.exercise.name)
        })
      )
    )
  );

  const worksetsByExercise = groupObjectsByProperty(
    workoutWorksets,
    "exerciseName"
  );

  const workoutExerciseNames = workoutWorksets
    .map(ww => ww.exerciseName)
    .filter((v, i, a) => a.indexOf(v) === i);

  const exerciseVolumes = workoutExerciseNames.map(exerciseName => ({
    exerciseName: exerciseName,
    volume: worksetsByExercise[exerciseName].reduce(
      (acc, workset) => acc + (workset.intensity || 0),
      0
    )
  }));
  return (
    <div key={`workout${workoutIndex}`} className="m-3 p-3 bg-gray-400 rounded">
      <div onClick={() => selectWorkout(workout, workoutIndex)}>
        <div
          className={`rounded py-1 px-2 bg-gray-900 text-lg text-orange-500 hover:text-orange-300`}
        >
          {name}
        </div>
        <div className="text-sm">{description}</div>
      </div>
      <div>
        <div className="border-solid border-2 border-gray-600" />
        <div className="text-sm ">
          Total Load-Volume:{" "}
          {exerciseVolumes.reduce((acc, exVol) => acc + exVol.volume, 0)}
          lbs/
          {workoutWorksets.length} worksets
        </div>
        <div className="border-dashed border-2 border-gray-600" />
        {exerciseVolumes.map(ev => (
          <div className="text-sm">
            {camelCaseToTitle(ev.exerciseName)}: {ev.volume}
            {worksetsByExercise[ev.exerciseName][0].intensityUnit}/
            {worksetsByExercise[ev.exerciseName].length} worksets
          </div>
        ))}
      </div>
    </div>
  );
};
