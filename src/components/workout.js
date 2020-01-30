import React, { useState } from "react";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { RxWorkgroupLabel, WorkoutResultForm } from ".";
import {
  groupObjectsByProperty,
  camelCaseToTitle,
  toCamelCase
} from "../utils";

const ConfirmCancelButtons = ({ confirm, cancel }) => {
  return (
    <div className="flex">
      <button
        onClick={() => confirm()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 rounded"
      >
        <FaCheck />
      </button>
      <button
        onClick={() => cancel()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded"
      >
        <FaTimes />
      </button>
    </div>
  );
};

const ConfirmEditButtons = ({ confirm, edit }) => {
  return (
    <div>
      <button
        onClick={() => edit()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
      >
        <FaEdit />
      </button>
      <button
        onClick={() => confirm()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 rounded"
      >
        <FaCheck />
      </button>
    </div>
  );
};

const WorkoutLabel = ({ workout, workoutIndex }) => (
  <div>
    {workout.workgroups.map((workgroup, workgroupIndex) => (
      <RxWorkgroupLabel
        key={"workgroupLabel" + workgroupIndex}
        workgroup={workgroup}
        workgroupIndex={workgroupIndex}
        workoutIndex={workoutIndex}
      />
    ))}
  </div>
);

export const Workout = ({ workout, workoutIndex }) => {
  const { name, description } = workout;
  const [workoutIsVisible, setWorkoutIsVisible] = useState(false);
  const toggleWorkoutVisibility = () => {
    setWorkoutIsVisible(!workoutIsVisible);
  };
  const [resultIsVisible, setResultIsVisible] = useState(false);
  const showResult = () => {
    setResultIsVisible(true);
  };
  const hideResult = () => {
    setResultIsVisible(false);
  };

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
    <div className="m-3 p-3 bg-gray-400 rounded">
      <div onClick={toggleWorkoutVisibility}>
        <div
          className={`rounded py-1 px-2 bg${
            workoutIsVisible ? "-gray-900" : "-gray-700"
          } text-lg text${
            workoutIsVisible ? "-orange-500" : "-orange-500"
          } hover:text-orange-300`}
        >
          {name}
        </div>
        <div className="text-sm">{description}</div>
      </div>
      {workoutIsVisible ? (
        resultIsVisible ? (
          <div>
            <ConfirmCancelButtons confirm={hideResult} cancel={hideResult} />
            <WorkoutResultForm workout={workout} workoutIndex={workoutIndex} />
            <ConfirmCancelButtons confirm={hideResult} cancel={hideResult} />
          </div>
        ) : (
          <div>
            <WorkoutLabel workout={workout} workoutIndex={workoutIndex} />
            <ConfirmEditButtons
              confirm={() => alert("Submit your result exactly as prescribed?")}
              edit={showResult}
            />
          </div>
        )
      ) : (
        <div>
          <div className="border-solid border-2 border-gray-600" />
          <div className="text-sm ">
            Total Load-Volume:{" "}
            {exerciseVolumes.reduce((acc, exVol) => acc + exVol.volume, 0)}lbs/
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
      )}
    </div>
  );
};
