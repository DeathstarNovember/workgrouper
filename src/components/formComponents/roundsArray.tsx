import React from "react";
import { Workout } from "../../types";
import { FieldArray } from "formik";
import {
  sectionStyle,
  sectionTitleStyle,
  RemoveButton,
  Select,
  Input,
  AddButton
} from ".";
import { intervalTypeOptions, newWorkset, newRound } from "../../data";
import WorksetsArray from "./worksetsArray";

type RoundsArrayProps = {
  values: Workout;
  workgroupIndex: number;
};
export const RoundsArray: React.FC<RoundsArrayProps> = ({
  values,
  workgroupIndex
}) => (
  <FieldArray
    name="rounds"
    render={roundsArrayHelpers => (
      <div>
        {values.workgroups[workgroupIndex].rounds.map((_round, roundIndex) => (
          <div
            className={sectionStyle}
            key={`wg${workgroupIndex}rd${roundIndex}`}
          >
            <div className="flex justify-between">
              <div className={sectionTitleStyle}>
                {`Round ${roundIndex + 1}`}
              </div>
              <RemoveButton
                remove={roundsArrayHelpers.remove}
                text="remove"
                textColor="gray"
                bgColor="red"
                hoverColor="red"
                index={roundIndex}
              />
            </div>
            <div className="flex">
              <Select
                labelText="Interval Type"
                options={intervalTypeOptions}
                fieldName={`workgroups[${workgroupIndex}].rounds[${roundIndex}].intervalType`}
              />
              <Input
                labelText="Interval Time"
                fieldName={`workgroups[${workgroupIndex}].rounds[${roundIndex}].interval`}
              />
            </div>
            <WorksetsArray
              values={values}
              workgroupIndex={workgroupIndex}
              roundIndex={roundIndex}
            />
          </div>
        ))}
        <AddButton
          add={() =>
            roundsArrayHelpers.push({
              ...newRound,
              sortOrder: values.workgroups[workgroupIndex].rounds.length,
              worksets: [{ ...newWorkset }]
            })
          }
          text="add round"
        />
      </div>
    )}
  />
);
