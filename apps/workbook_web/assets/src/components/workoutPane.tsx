import React, { useState } from "react";
import { WorkoutLabel } from "./labelComponents";
import { WorkoutForm, ResultForm } from "./formComponents";
import { Workout } from "../types";
import { ButtonGroup } from "../workbook_ui";
import { useMutation } from "@apollo/react-hooks";
import { deleteWorkoutMutation } from "../graphql";

type CustomResultButtonProps = {
  showForm: () => void;
  className?: string;
};
const CustomResultButton: React.FC<CustomResultButtonProps> = ({
  showForm,
  className
}) => (
  <button
    onClick={() => showForm()}
    className={`${className} bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 py-1`}
  >
    Custom
  </button>
);

type RxResultButtonProps = {
  confirm: () => void;
  className?: string;
};
const RxResultButton: React.FC<RxResultButtonProps> = ({
  confirm,
  className
}) => (
  <button
    onClick={() => confirm()}
    className={`${className} bg-green-500 hover:bg-green-700 text-white font-bold px-2 py-1`}
  >
    Rx
  </button>
);

type UpdateWorkoutButtonProps = {
  updateWorkout: () => void;
  className?: string;
};
const UpdateWorkoutButton: React.FC<UpdateWorkoutButtonProps> = ({
  updateWorkout,
  className
}) => (
  <button
    onClick={updateWorkout}
    className={`${className} bg-purple-500 hover:bg-purple-700 text-white font-bold px-2 py-1`}
  >
    Copy
  </button>
);
type DeleteWorkoutButtonProps = {
  deleteWorkout: () => void;
  className?: string;
};
const DeleteWorkoutButton: React.FC<DeleteWorkoutButtonProps> = ({
  deleteWorkout,
  className
}) => (
  <button
    onClick={deleteWorkout}
    className={`${className} bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1`}
  >
    Delete
  </button>
);

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
  const [resultFormIsVisible, setResultFormIsVisible] = useState(false);
  const [updateFormIsVisible, setUpdateFormIsVisible] = useState(false);
  const showResultForm = () => {
    setResultFormIsVisible(true);
  };
  const hideResultForm = () => {
    setResultFormIsVisible(false);
  };
  const showUpdateForm = () => {
    setUpdateFormIsVisible(true);
  };
  const hideUpdateForm = () => {
    setUpdateFormIsVisible(false);
  };
  const [deleteWorkout] = useMutation(deleteWorkoutMutation, {
    variables: { id: workout.id },
    onCompleted: clearSelectedWorkout
  });

  return (
    <div className="p-6 rounded max-w-lg w-full">
      <div>
        <div>
          <div className={`rounded py-1 text-gray-900 text-3xl font-bold`}>
            {name}
          </div>
          <div className="text-gray-700 text-lg">{description}</div>
          <ButtonGroup>
            <RxResultButton confirm={confirm} />
            <CustomResultButton showForm={showResultForm} />
            <UpdateWorkoutButton updateWorkout={showUpdateForm} />
            <DeleteWorkoutButton deleteWorkout={deleteWorkout} />
          </ButtonGroup>
        </div>
      </div>
      {workoutIndex !== undefined ? (
        resultFormIsVisible ? (
          <div>
            <ResultForm
              workoutId={workout.id}
              workout={workout}
              hideForm={hideResultForm}
            />
          </div>
        ) : updateFormIsVisible ? (
          <div>
            <WorkoutForm
              workoutId={workout.id}
              workout={workout}
              hideForm={hideUpdateForm}
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
