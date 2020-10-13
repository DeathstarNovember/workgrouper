import React, { useState } from "react";
import { WorkoutLabel } from "./labelComponents";
import { WorkoutForm, ResultForm } from "./formComponents";
import { Workout } from "../types";
import { ButtonGroup } from "../workbook_ui";
import { useMutation } from "@apollo/react-hooks";
import { deleteWorkoutMutation } from "../graphql";
import { WorkoutOverview } from ".";

type WorkoutPaneProps = {
  workout: Workout;
  workoutIndex: number;
  clearSelectedWorkout: () => void;
};

export const WorkoutPane: React.FC<WorkoutPaneProps> = ({
  workout,
  workoutIndex,
  clearSelectedWorkout,
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
    onCompleted: clearSelectedWorkout,
  });

  return (
    <div className="p-6 rounded max-w-lg w-full">
      <ButtonGroup>
        <Button
          handleClick={confirm}
          label="Record RX Result"
          color="white"
          bg="green"
        />
        <Button
          handleClick={showResultForm}
          label="Record Custom Result"
          color="white"
          bg="blue"
        />
        <Button
          handleClick={showUpdateForm}
          label="Copy"
          color="white"
          bg="purple"
        />
        <Button
          handleClick={deleteWorkout}
          label="Delete"
          color="white"
          bg="red"
        />
      </ButtonGroup>
      <div>
        <div className={`rounded mt-2 text-gray-900 text-3xl font-bold`}>
          {name}
        </div>
        <WorkoutOverview
          key={`workoutOverview${workoutIndex}`}
          workout={workout}
          workoutIndex={workoutIndex}
        />
        <div className="text-gray-700 text-lg mb-2">{description}</div>
      </div>
      {workoutIndex !== undefined ? (
        resultFormIsVisible ? (
          <ResultForm
            workoutId={workout.id}
            workout={workout}
            hideForm={hideResultForm}
          />
        ) : updateFormIsVisible ? (
          <WorkoutForm
            workoutId={workout.id}
            workout={workout}
            hideForm={hideUpdateForm}
          />
        ) : (
          <WorkoutLabel workout={workout} workoutIndex={workoutIndex} />
        )
      ) : (
        <div className="text-red-700 text-lg">Could not get details.</div>
      )}
    </div>
  );
};
