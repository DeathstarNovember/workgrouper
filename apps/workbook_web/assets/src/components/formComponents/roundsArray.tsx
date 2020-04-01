import React from "react";
import { Workout, Exercise } from "../../types";
import { FieldArray, useFormikContext } from "formik";
import {
  sectionTitleStyle,
  RemoveButton,
  Select,
  Input,
  AddButton,
  SwapUpButton,
  SwapDownButton,
  WorksetsArray,
  roundSectionStyle
} from ".";
import { intervalTypeOptions, newWorkset } from "../../data";

type RoundsArrayProps = {
  workgroupIndex: number;
  name: string;
  exercises: Exercise[];
};
export const RoundsArray: React.FC<RoundsArrayProps> = ({
  workgroupIndex,
  name,
  exercises
}) => {
  const { values }: { values: Workout } = useFormikContext();
  return (
    <FieldArray
      name={name}
      render={roundsArrayHelpers => (
        <div>
          {values.workgroups[workgroupIndex].rounds.map(
            (_round, roundIndex) => {
              const roundFieldNamePrefix = `${name}[${roundIndex}]`;
              const roundCount =
                values.workgroups[workgroupIndex].rounds.length;
              return (
                <div
                  className={roundSectionStyle}
                  key={`wg${workgroupIndex}rd${roundIndex}`}
                >
                  {roundCount > 1 ? (
                    <div>
                      <div className="flex justify-between">
                        <div className={sectionTitleStyle}>
                          <div>{`Round ${roundIndex + 1}`}</div>
                          <div>
                            {roundIndex !== 0 ? (
                              <SwapUpButton
                                swap={roundsArrayHelpers.swap}
                                index={roundIndex}
                              />
                            ) : null}
                            {roundIndex !==
                            values.workgroups[workgroupIndex].rounds.length -
                              1 ? (
                              <SwapDownButton
                                swap={roundsArrayHelpers.swap}
                                index={roundIndex}
                              />
                            ) : null}
                            <RemoveButton
                              remove={roundsArrayHelpers.remove}
                              index={roundIndex}
                            />
                          </div>
                        </div>
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
                    name={`${roundFieldNamePrefix}.worksets`}
                    workgroupIndex={workgroupIndex}
                    roundIndex={roundIndex}
                    exercises={exercises}
                  />
                </div>
              );
            }
          )}
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
};
