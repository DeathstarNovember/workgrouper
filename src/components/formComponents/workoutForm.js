import React from "react";
import { useForm, FormContext, useFormContext } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

export const WorkoutForm = ({ setWorkoutFormIsVisible }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  const hideForm = () => {
    setWorkoutFormIsVisible(false);
  };

  return (
    <form className="flex-col m-3" onSubmit={handleSubmit(onSubmit)}>
      <button
        onClick={() => hideForm()}
        className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 mb-3 rounded"
      >
        <FaTimes />
      </button>
      <div className="flex-col flex-1">
        <div>
          <input
            name="name"
            ref={register({ required: true })}
            placeholder="Workout name"
          />
        </div>
        <div>
          <input
            name="description"
            ref={register({ required: true })}
            placeholder="Workout description"
          />
        </div>
      </div>
    </form>
  );
};
