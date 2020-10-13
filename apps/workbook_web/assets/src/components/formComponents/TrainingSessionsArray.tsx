import React from "react";
import { Program } from "../../types";
import { FieldArray, useFormikContext } from "formik";
import { newTrainingSession } from "../../data";
import { Input } from ".";
import {
  FormSection,
  SectionStyles,
  FlexBox,
  Box,
  RemoveButton,
  AddButton,
  SwapUpButton,
  SwapDownButton,
} from "../../workbook_ui";

type TrainingSessionsArrayProps = {
  phaseIndex: number;
  cycleIndex: number;
};

export const TrainingSessionsArray: React.FC<TrainingSessionsArrayProps> = ({
  phaseIndex,
  cycleIndex,
}) => {
  const { values }: { values: Program } = useFormikContext();
  const trainingSessions =
    values.phases[phaseIndex].cycles[cycleIndex].trainingSessions;
  return (
    <FieldArray
      name="trainingSessions"
      render={(trainingSessionsArrayHelpers) => (
        <Box>
          {trainingSessions.map((_trainingSession, trainingSessionIndex) => {
            const trainingsessionFieldNamePrefix = `trainingsessions[${trainingSessionIndex}]`;
            return (
              <Box key={`wg${trainingSessionIndex}`}>
                <FlexBox className="justify-between">
                  <FormSection sectionStyle={SectionStyles.sectionTitle}>
                    <Box>
                      {trainingSessionIndex !== 0 ? (
                        <SwapUpButton
                          swap={trainingSessionsArrayHelpers.swap}
                          index={trainingSessionIndex}
                        />
                      ) : null}
                      {trainingSessionIndex !== trainingSessions.length - 1 ? (
                        <SwapDownButton
                          swap={trainingSessionsArrayHelpers.swap}
                          index={trainingSessionIndex}
                        />
                      ) : null}
                      <RemoveButton
                        remove={trainingSessionsArrayHelpers.remove}
                        index={trainingSessionIndex}
                        text=""
                      />
                    </Box>
                  </FormSection>
                </FlexBox>
                <Input
                  labelText="Training Session name"
                  fieldName={`${trainingsessionFieldNamePrefix}].name`}
                  placeholder="Training Session Name"
                />
                <Input
                  labelText="Training Session description"
                  fieldName={`${trainingsessionFieldNamePrefix}].description`}
                  placeholder="Training Session Description"
                />
              </Box>
            );
          })}
          <AddButton
            add={() =>
              trainingSessionsArrayHelpers.push({
                ...newTrainingSession,
                sortOrder: trainingSessions.length,
              })
            }
            text="add training session"
          />
        </Box>
      )}
    />
  );
};
