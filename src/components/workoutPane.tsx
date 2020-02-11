import React, { useState } from "react";
import { FaCheck, FaTimes, FaEdit, FaArrowLeft } from "react-icons/fa";
import { WorkoutLabel } from "./labelComponents";
import { WorkoutResultForm } from "./formComponents";
import { Workout } from "../types";

type ConfirmCancelButtonsProps = {
  confirm: () => void;
  cancel: () => void;
};

const ConfirmCancelButtons: React.FC<ConfirmCancelButtonsProps> = ({
  confirm,
  cancel
}) => {
  return (
    <div className="flex justify-between">
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

type ConfirmEditButtonsProps = {
  confirm: () => void;
  edit: () => void;
};

const ConfirmEditButtons: React.FC<ConfirmEditButtonsProps> = ({
  confirm,
  edit
}) => {
  return (
    <div className="flex justify-between">
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

type WorkoutPaneProps = {
  workout: Workout;
  workoutIndex?: number;
  clearSelectedWorkout: () => void;
  showForm: () => void;
};

export const WorkoutPane: React.FC<WorkoutPaneProps> = ({
  workout,
  workoutIndex,
  clearSelectedWorkout,
  showForm
}) => {
  const { name, description } = workout;
  const [resultIsVisible, setResultIsVisible] = useState(false);
  const showResult = () => {
    setResultIsVisible(true);
  };
  const hideResult = () => {
    setResultIsVisible(false);
  };

  const BackButton = () => {
    return (
      <button
        onClick={() => clearSelectedWorkout()}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 py-1 rounded"
      >
        <FaArrowLeft />
      </button>
    );
  };
  const ShowFormButton = () => {
    return (
      <button
        onClick={() => showForm()}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 py-1 rounded"
      >
        <FaEdit />
      </button>
    );
  };
  return (
    <div className="m-3 p-3 bg-gray-400 rounded ">
      <div>
        <BackButton />
        <ShowFormButton />
        <div className={`rounded py-1 text-gray-900 text-xl`}>{name}</div>
        <div className="text-sm">{description}</div>
      </div>
      {/* {Number.isNaN(Number(workoutIndex)) ? ( */}
      {workoutIndex !== undefined ? (
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
        <div className="text-red-700 text-lg">Could not get details.</div>
      )}
    </div>
  );
};
