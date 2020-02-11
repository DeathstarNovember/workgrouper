import React from "react";
import { useFormContext } from "react-hook-form";
import { IntervalType, Workset, IntensityUnit, Exercise } from "../../types";
import { exercises } from "../../data";

type WorksetArrayFieldsProps = {
  worksetIndex: number;
  roundIndex: number;
  workgroupIndex: number;
};

export const WorksetArrayFields: React.FC<WorksetArrayFieldsProps> = ({
  worksetIndex,
  roundIndex,
  workgroupIndex
}) => {
  const { register } = useFormContext();
  const intervalOptions = [
    { value: IntervalType.inclusive, label: "Inclusive" },
    { value: IntervalType.exclusive, label: "Exclusive" },
    { value: IntervalType.none, label: "No Interval" }
  ];
  return (
    <div className="bg-gray-600 rounded p-3 my-1">
      <div>
        <select
          name={`workgroups[${workgroupIndex}].rounds[${roundIndex}].worksets[${worksetIndex}]exercise`}
          ref={register({ required: true })}
        >
          {exercises.map((exercise, optionId) => (
            <option
              key={`${workgroupIndex}${roundIndex}${worksetIndex}exerciseOption${optionId}`}
              value={`${exercise.name}`}
            >
              {exercise.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          name={`workgroups[${workgroupIndex}].rounds[${roundIndex}].worksets[${worksetIndex}]interval`}
          ref={register({ required: true })}
        >
          {intervalOptions.map((option, optionId) => (
            <option key={`intervalOption${optionId}`} value={`${option.value}`}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
