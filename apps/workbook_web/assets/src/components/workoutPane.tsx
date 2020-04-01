import React, { useState } from "react";
import { WorkoutLabel } from "./labelComponents";
import { WorkoutForm, ResultForm } from "./formComponents";
import { Workout } from "../types";

type ActionButtonsProps = {
  confirm: () => void;
  showForm: () => void;
};

type CustomResultButtonProps = {
  showForm: () => void;
};

const CustomResultButton: React.FC<CustomResultButtonProps> = ({
  showForm
}) => (
  <button
    onClick={() => showForm()}
    className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 py-1 ml-2 rounded"
  >
    custom result
  </button>
);

type RxResultButtonProps = {
  confirm: () => void;
};

const RxResultButton: React.FC<RxResultButtonProps> = ({ confirm }) => (
  <button
    onClick={() => confirm()}
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1 rounded"
  >
    Rx result
  </button>
);

const ActionButtons: React.FC<ActionButtonsProps> = ({ confirm, showForm }) => {
  return (
    <div className="flex">
      <RxResultButton confirm={confirm} />
      <CustomResultButton showForm={showForm} />
    </div>
  );
};

type WorkoutPaneProps = {
  workout: Workout;
  workoutIndex?: number;
  clearSelectedWorkout: () => void;
};

export const WorkoutPane: React.FC<WorkoutPaneProps> = ({
  workout,
  workoutIndex
}) => {
  const { name, description } = workout;
  const [resultIsVisible, setResultIsVisible] = useState(false);
  const showResult = () => {
    setResultIsVisible(true);
  };
  const hideResult = () => {
    setResultIsVisible(false);
  };

  return (
    <div className="p-6 rounded max-w-lg w-full">
      <div>
        <div>
          <div className={`rounded py-1 text-gray-900 text-3xl font-bold`}>
            {name}
          </div>
          <div className="text-gray-700 text-lg">{description}</div>
          <ActionButtons
            confirm={() =>
              alert("comming soon! Submit your result exactly as prescribed!")
            }
            showForm={showResult}
          />
        </div>
      </div>
      {workoutIndex !== undefined ? (
        resultIsVisible ? (
          <div>
            <ResultForm
              workoutId={workout.id}
              workout={workout}
              hideForm={hideResult}
            />
          </div>
        ) : (
          <div>
            <WorkoutLabel workout={workout} workoutIndex={workoutIndex} />
          </div>
        )
      ) : (
        <div className="text-red-700 text-lg">Could not get details.</div>
      )}
    </div>
  );
};
