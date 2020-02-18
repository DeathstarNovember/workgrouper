import React from "react";
import { useForm, FormContext, useFormContext } from "react-hook-form";
import { RxWorkgroupLabel } from "../labelComponents";
import { Workgroup, IntervalType, Workout } from "../../types";

type WorkgroupResultFormProps = {
  workgroup: Workgroup;
  workgroupIndex: number;
  workoutIndex: number;
};

const WorkgroupResultForm: React.FC<WorkgroupResultFormProps> = ({
  workgroup,
  workgroupIndex,
  workoutIndex
}) => {
  const { register } = useFormContext();
  const inputStyle =
    "bg-gray-300 shadow appearance-none border rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <div key={`workoutWorkgroupFormInputs${workgroupIndex}`} className="mb-4">
      <RxWorkgroupLabel
        workgroup={workgroup}
        workoutIndex={workoutIndex}
        workgroupIndex={workgroupIndex}
      />
      <div className="bg-gray-500 rounded p-2">
        {workgroup.rounds.map((round, roundIndex) => {
          return round.worksets.map((workset, worksetIndex) => {
            const {
              exercise,
              reps,
              intensity,
              intervalType,
              interval
            } = workset;
            const intervalSymbol =
              intervalType === IntervalType.inclusive ? " //" : " /";
            return (
              <div
                key={`workgorupForm${workgroupIndex}round${roundIndex}inputs${worksetIndex}`}
                className="mb-1"
              >
                <div className="text-sm">
                  {workgroup.rounds.length > 1
                    ? `Round ${roundIndex + 1},`
                    : null}{" "}
                  Set {worksetIndex + 1} - {exercise.name}
                </div>
                <div className="flex ml-5">
                  <input
                    className={inputStyle + " w-10"}
                    name={`workset[${worksetIndex}]reps`}
                    defaultValue={reps}
                    type="number"
                    ref={register({ required: true, pattern: /\d+/ })}
                  />{" "}
                  @
                  <input
                    className={inputStyle + " w-20"}
                    name={`workset[${worksetIndex}]intensity`}
                    defaultValue={intensity}
                    type="number"
                    ref={register({ required: true, pattern: /\d+/ })}
                  />
                  <div className="mr-2">{exercise.intensityUnit}</div>
                  <div className="mr-2">{intervalSymbol}</div>
                  <input
                    className={inputStyle + " w-20"}
                    name={`workset[${worksetIndex}]interval`}
                    defaultValue={interval}
                    type="number"
                    ref={register({ required: true, pattern: /\d+/ })}
                  />
                </div>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

type WorkoutResultFormProps = {
  workout: Workout;
  workoutIndex: number;
};

export const WorkoutResultForm: React.FC<WorkoutResultFormProps> = ({
  workout,
  workoutIndex
}) => {
  const methods = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div key={`workoutResultForm${workoutIndex}`}>
          {workout.workgroups.map((workgroup, workgroupIndex) => (
            <WorkgroupResultForm
              key={`workgroupResultForm${workgroupIndex}`}
              workoutIndex={workoutIndex}
              workgroup={workgroup}
              workgroupIndex={workgroupIndex}
            />
          ))}
        </div>
        <input type="submit" />
      </form>
    </FormContext>
  );
};
