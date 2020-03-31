import React, { useState } from "react";
import { WorkoutLabel } from "./labelComponents";
import { WorkoutForm } from "./formComponents";
import { Workout } from "../types";

type ActionButtonsProps = {
  confirm: () => void;
  clearSelectedWorkout: () => void;
  showForm: () => void;
};

type CloseButtonProps = {
  close: () => void;
};

const CloseButton: React.FC<CloseButtonProps> = ({ close }) => (
  <button
    onClick={() => close()}
    className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 mr-2 rounded"
  >
    close
  </button>
);

type CustomResultButtonProps = {
  showForm: () => void;
};

const CustomResultButton: React.FC<CustomResultButtonProps> = ({
  showForm
}) => (
  <button
    onClick={() => showForm()}
    className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 py-1 mr-2 rounded"
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
    className="bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1 rounded"
  >
    Rx result
  </button>
);

const ActionButtons: React.FC<ActionButtonsProps> = ({
  confirm,
  clearSelectedWorkout,
  showForm
}) => {
  return (
    <div className="flex">
      <CloseButton close={clearSelectedWorkout} />
      <CustomResultButton showForm={showForm} />
      <RxResultButton confirm={confirm} />
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
  workoutIndex,
  clearSelectedWorkout
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
        <div className="flex">
          <ActionButtons
            confirm={() =>
              alert("comming soon! Submit your result exactly as prescribed!")
            }
            clearSelectedWorkout={clearSelectedWorkout}
            showForm={showResult}
          />
        </div>
        <div>
          <div className={`rounded py-1 text-gray-900 text-xl`}>{name}</div>
          <div className="text-sm">{description}</div>
        </div>
      </div>
      {workoutIndex !== undefined ? (
        resultIsVisible ? (
          <div>
            <WorkoutForm
              result
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
