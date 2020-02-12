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
  name: string;
};
export const RoundsArray: React.FC<RoundsArrayProps> = ({
  values,
  workgroupIndex,
  name
}) => (
  <FieldArray
    name={name}
    render={roundsArrayHelpers => (
      <div>
        {values.workgroups[workgroupIndex].rounds.map((_round, roundIndex) => {
          const roundFieldNamePrefix = `${name}[${roundIndex}]`;
          return (
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
                  fieldName={`${roundFieldNamePrefix}.intervalType`}
                />
                <Input
                  labelText="Interval Time"
                  fieldName={`${roundFieldNamePrefix}.interval`}
                />
              </div>
              <WorksetsArray
                values={values}
                name={`${roundFieldNamePrefix}.worksets`}
                workgroupIndex={workgroupIndex}
                roundIndex={roundIndex}
              />
            </div>
          );
        })}
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
