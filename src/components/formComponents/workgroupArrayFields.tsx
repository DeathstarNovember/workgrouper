import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { RoundArrayFields } from ".";
import { Round, IntervalType } from "../../types";
import { FaTimes, FaArrowDown, FaArrowUp, FaPlus } from "react-icons/fa";

type WorkgroupArrayFieldsProps = {
  workgroupIndex: number;
};

const newRound: Round = {
  sortOrder: 0,
  interval: 0,
  intervalType: IntervalType.none,
  worksets: []
};

export const WorkgroupArrayFields: React.FC<WorkgroupArrayFieldsProps> = ({
  workgroupIndex
}) => {
  const { register } = useFormContext();
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      name: "rounds"
    }
  );
  return (
    <div className="bg-gray-400 rounded p-3 my-1">
      <div>
        <input
          name={`workgroups[${workgroupIndex}]note`}
          ref={register({})}
          placeholder="Workgroup notes"
        />
      </div>
      <button
        type="button"
        onClick={() => append({ ...newRound, sortOrder: fields.length })}
      >
        <FaPlus />
      </button>
      <div>
        {fields.map((roundField, roundIndex) => (
          <div key={`${roundField.id}`}>
            <RoundArrayFields
              roundIndex={roundIndex}
              workgroupIndex={workgroupIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
