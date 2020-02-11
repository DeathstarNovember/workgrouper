import React, { useState } from "react";
import { useForm, FormContext, useFieldArray } from "react-hook-form";
import { FaTimes, FaPlusCircle, FaPlus } from "react-icons/fa";
import {
  Workout,
  Workgroup,
  Round,
  IntervalType,
  Workset,
  IntensityUnit
} from "../../types";
import { WorkgroupArrayFields } from "./workgroupArrayFields";
//TODO:
type WorkoutFormProps = {
  setWorkoutFormIsVisible: (arg0: boolean) => void;
  workout?: Workout;
};

const newWorkgroup: Workgroup = {
  sortOrder: 0,
  note: "",
  rounds: []
};

const newRound: Round = {
  sortOrder: 0,
  interval: 0,
  intervalType: IntervalType.none,
  worksets: []
};

const newWorkset: Workset = {
  exercise: {
    name: "Barbell Bench Press",
    intensityUnit: IntensityUnit.pounds
  },
  reps: 0,
  intensity: 0,
  relativeIntensity: 0,
  intensityUnit: IntensityUnit.pounds,
  intervalType: IntervalType.exclusive,
  interval: 0
};

const newWorkout: Workout = {
  name: "",
  description: "",
  workgroups: [
    {
      ...newWorkgroup,
      rounds: [{ ...newRound, worksets: [{ ...newWorkset }] }]
    }
  ]
};

export const WorkoutForm: React.FC<WorkoutFormProps> = ({
  setWorkoutFormIsVisible,
  workout
}) => {
  const [formState, setFormState] = useState(workout ? workout : newWorkout);
  const workoutFormMethods = useForm();
  // const { register, handleSubmit, getValues } = workoutFormMethods;
  const { register, handleSubmit, control, getValues } = workoutFormMethods;
  // const [formData, setFormData] = useState<Workout>(workout || newWorkout);
  const onSubmit = (data: any) => {
    console.log(data);
  };
  const hideForm = () => {
    setWorkoutFormIsVisible(false);
  };
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "workgroups" // unique name for your Field Array
    }
  );

  return (
    <FormContext {...workoutFormMethods}>
      <form
        className="flex-col m-3 p-3 bg-gray-300 rounded"
        onSubmit={handleSubmit(onSubmit)}
      >
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
        <div>
          <div>
            <button
              type="button"
              onClick={() =>
                append({ ...newWorkgroup, sortOrder: fields.length })
              }
            >
              <FaPlus />
            </button>
          </div>
          <div>
            {fields.map((workgroupField, workgroupIndex) => {
              return (
                <div key={workgroupField.id}>
                  <WorkgroupArrayFields workgroupIndex={workgroupIndex} />
                </div>
              );
            })}
          </div>
        </div>
      </form>
    </FormContext>
  );
};
