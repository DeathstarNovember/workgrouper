import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { IntervalType, Workset, IntensityUnit } from "../../types";
import { WorksetArrayFields } from ".";
import { FaPlus } from "react-icons/fa";

type RoundArrayFieldsProps = {
  roundIndex: number;
  workgroupIndex: number;
};

const newWorkset: Partial<Workset> = {
  exercise: undefined,
  reps: 0,
  intensity: 0,
  relativeIntensity: 0,
  intensityUnit: IntensityUnit.pounds,
  intervalType: IntervalType.exclusive,
  interval: 0
};

export const RoundArrayFields: React.FC<RoundArrayFieldsProps> = ({
  roundIndex,
  workgroupIndex
}) => {
  const { register } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "worksets"
    }
  );
  const intervalOptions = [
    { value: IntervalType.inclusive, label: "Inclusive" },
    { value: IntervalType.exclusive, label: "Exclusive" },
    { value: IntervalType.none, label: "No Interval" }
  ];
  return (
    <div className="bg-gray-500 rounded p-3 my-1">
      <div>
        <div>
          <select
            name={`workgroups[${workgroupIndex}].rounds[${roundIndex}]interval`}
            ref={register({ required: true })}
          >
            {intervalOptions.map((option, optionId) => (
              <option
                key={`workgroup${workgroupIndex}round${roundIndex}intervalOption${optionId}`}
                value={`${option.value}`}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>{/* <input name/> */}</div>
      </div>
      <div>
        <div>
          {/* <div>
            <button type="button" onClick={() => prepend({ ...newWorkset })}>
              prepend
            </button>
          </div> */}
          <div>
            <button
              type="button"
              onClick={() =>
                append({ ...newWorkset, sortOrder: fields.length })
              }
            >
              <FaPlus />
            </button>
          </div>
          <div>
            {fields.map((worksetField, worksetIndex) => (
              <div key={`${worksetField.id}`}>
                <WorksetArrayFields
                  workgroupIndex={workgroupIndex}
                  roundIndex={roundIndex}
                  worksetIndex={worksetIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
