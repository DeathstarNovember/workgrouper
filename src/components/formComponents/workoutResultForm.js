import React from "react";
import {
  useForm,
  FormContext,
  useFormContext,
  useFieldArray
} from "react-hook-form";
import { RxWorkgroupLabel } from "../labelComponents";

const WorkgroupResultForm = ({ workgroup, workgroupIndex }) => {
  const { register } = useFormContext();
  const arrayMethods = useFieldArray({
    name: "workset"
  });
  const inputStyle =
    "bg-gray-300 shadow appearance-none border rounded p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
  return (
    <div key={`workoutWorkgroupFormInputs${workgroupIndex}`} className="mb-4">
      <RxWorkgroupLabel workgroup={workgroup} />
      <div className="bg-gray-500 rounded p-2">
        {workgroup.rounds.map((round, roundIndex) => {
          return round.worksets.map((workset, worksetIndex) => {
            const {
              exercise,
              reps,
              intensity,
              intensityUnit,
              intervalType,
              interval
            } = workset;
            const intervalSymbol = intervalType === "inclusive" ? " //" : " /";
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
                  <div className="mr-2">{intensityUnit}</div>
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

export const WorkoutResultForm = ({ workout, workoutId }) => {
  const methods = useForm();
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div key={`workoutResultForm${workoutId}`}>
          {workout.workgroups.map((workgroup, workgroupIndex) => (
            <WorkgroupResultForm
              key={`workgroupResultForm${workgroupIndex}`}
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
