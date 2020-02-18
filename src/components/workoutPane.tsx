import React, { useState } from "react";
import { FaCheck, FaEdit, FaArrowLeft } from "react-icons/fa";
import { WorkoutLabel } from "./labelComponents";
import { WorkoutForm } from "./formComponents";
import { Workout } from "../types";

type ConfirmEditButtonsProps = {
  confirm: () => void;
  edit: () => void;
};

const ConfirmEditButtons: React.FC<ConfirmEditButtonsProps> = ({
  confirm,
  edit
}) => {
  return (
    <div className="flex">
      <button
        onClick={() => edit()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 mr-2 rounded"
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
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 py-1 mr-2 rounded"
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
    <div className="p-3 rounded max-w-lg w-full">
      <div>
        <div className="flex">
          <BackButton />
          <ShowFormButton />
        </div>
        <div>
          <div className={`rounded py-1 text-gray-900 text-xl`}>{name}</div>
          <div className="text-sm">{description}</div>
        </div>
      </div>
      {workoutIndex !== undefined ? (
        resultIsVisible ? (
          <div>
            <WorkoutForm workout={workout} hideForm={hideResult} />
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
