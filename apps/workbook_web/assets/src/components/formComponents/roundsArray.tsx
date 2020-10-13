import React from "react";
import { Workout, Exercise } from "../../types";
import { FieldArray, useFormikContext } from "formik";
import { Select, Input, WorksetsArray } from ".";
import { intervalTypeOptions, newWorkset } from "../../data";
import {
  FormSection,
  SectionStyles,
  RemoveButton,
  AddButton,
  SwapUpButton,
  SwapDownButton,
  Box,
  FlexBox,
} from "../../workbook_ui";

type RoundsArrayProps = {
  workgroupIndex: number;
  name: string;
  exercises: Exercise[];
};
export const RoundsArray: React.FC<RoundsArrayProps> = ({
  workgroupIndex,
  name,
  exercises,
}) => {
  const { values }: { values: Workout } = useFormikContext();
  return (
    <FieldArray
      name={name}
      render={(roundsArrayHelpers) => (
        <Box>
          {values.workgroups[workgroupIndex].rounds.map(
            (_round, roundIndex) => {
              const roundFieldNamePrefix = `${name}[${roundIndex}]`;
              const roundCount =
                values.workgroups[workgroupIndex].rounds.length;
              return (
                <FormSection
                  sectionStyle={SectionStyles.roundSection}
                  key={`wg${workgroupIndex}rd${roundIndex}`}
                >
                  {roundCount > 1 ? (
                    <Box>
                      <FlexBox className="justify-between">
                        <FormSection sectionStyle={SectionStyles.sectionTitle}>
                          <Box>{`Round ${roundIndex + 1}`}</Box>
                          <Box>
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
                          </Box>
                        </FormSection>
                      </FlexBox>
                      <FlexBox>
                        <Select
                          labelText="Interval Type"
                          options={intervalTypeOptions}
                          fieldName={`${roundFieldNamePrefix}.intervalType`}
                        />
                        <Input
                          labelText="Interval Time"
                          fieldName={`${roundFieldNamePrefix}.interval`}
                        />
                      </FlexBox>
                    </Box>
                  ) : null}
                  <WorksetsArray
                    name={`${roundFieldNamePrefix}.worksets`}
                    workgroupIndex={workgroupIndex}
                    roundIndex={roundIndex}
                    exercises={exercises}
                  />
                </FormSection>
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
                    : [{ ...newWorkset }],
              })
            }
            text="add round"
          />
        </Box>
      )}
    />
  );
};
