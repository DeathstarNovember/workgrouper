import React from "react";
import { Workout } from "../../types";
import { FieldArray } from "formik";
import {
  sectionStyle,
  sectionTitleStyle,
  RemoveButton,
  Select,
  Input,
  AddButton,
  SwapUpButton,
  SwapDownButton
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
          const roundCount = values.workgroups[workgroupIndex].rounds.length;
          return (
            <div
              className={sectionStyle}
              key={`wg${workgroupIndex}rd${roundIndex}`}
            >
              {roundCount > 1 ? (
                <div>
                  <div className="flex justify-between">
                    <div className={sectionTitleStyle}>
                      <div>
                        {roundIndex !== 0 ? (
                          <SwapUpButton
                            swap={roundsArrayHelpers.swap}
                            index={roundIndex}
                          />
                        ) : null}
                        {roundIndex !==
                        values.workgroups[workgroupIndex].rounds.length - 1 ? (
                          <SwapDownButton
                            swap={roundsArrayHelpers.swap}
                            index={roundIndex}
                          />
                        ) : null}
                      </div>
                      {`Round ${roundIndex + 1}`}
                    </div>
                    <RemoveButton
                      remove={roundsArrayHelpers.remove}
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
                </div>
              ) : null}
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
              ...values.workgroups[workgroupIndex].rounds[
                values.workgroups[workgroupIndex].rounds.length - 1
              ],
              sortOrder: values.workgroups[workgroupIndex].rounds.length,
              worksets:
                values.workgroups[workgroupIndex].rounds[
                  values.workgroups[workgroupIndex].rounds.length - 1
                ].worksets.length > 0
                  ? values.workgroups[workgroupIndex].rounds[
                      values.workgroups[workgroupIndex].rounds.length - 1
                    ].worksets
                  : [{ ...newWorkset }]
            })
          }
          text="add round"
        />
      </div>
    )}
  />
);
