import React, { useState } from "react";
import { FaCheck, FaTimes, FaEdit } from "react-icons/fa";
import { WorkoutLabel, WorkoutResultForm } from ".";

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

export const Workout = ({ workout, workoutIndex }) => {
  const { name, description } = workout;
  const [resultIsVisible, setResultIsVisible] = useState(false);
  const showResult = () => {
    setResultIsVisible(true);
  };
  const hideResult = () => {
    setResultIsVisible(false);
  };

  return (
    <div className="m-3 p-3 bg-gray-400 rounded">
      <div>
        <div
          className={`rounded py-1 px-2 bg-gray-900 text-lg text-orange-500 hover:text-orange-300`}
        >
          {name}
        </div>
        <div className="text-sm">{description}</div>
      </div>
      {resultIsVisible ? (
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
      )}
    </div>
  );
};
