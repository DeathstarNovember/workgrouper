import React from "react";
import { Program } from "../../types";
import { FieldArray, useFormikContext } from "formik";
import { newCycle } from "../../data";
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
import { TrainingSessionsArray } from "./TrainingSessionsArray";

type CyclesArrayProps = {
  phaseIndex: number;
};

export const CyclesArray: React.FC<CyclesArrayProps> = ({ phaseIndex }) => {
  const { values }: { values: Program } = useFormikContext();
  const cycles = values.phases[phaseIndex].cycles;
  return (
    <FieldArray
      name="cycles"
      render={(cyclesArrayHelpers) => (
        <Box>
          {cycles.map((_cycle, cycleIndex) => {
            const cycleFieldNamePrefix = `cycles[${cycleIndex}]`;
            return (
              <Box key={`wg${cycleIndex}`}>
                <FlexBox className="justify-between">
                  <FormSection sectionStyle={SectionStyles.sectionTitle}>
                    <Box>
                      {cycleIndex !== 0 ? (
                        <SwapUpButton
                          swap={cyclesArrayHelpers.swap}
                          index={cycleIndex}
                        />
                      ) : null}
                      {cycleIndex !== cycles.length - 1 ? (
                        <SwapDownButton
                          swap={cyclesArrayHelpers.swap}
                          index={cycleIndex}
                        />
                      ) : null}
                      <RemoveButton
                        remove={cyclesArrayHelpers.remove}
                        index={cycleIndex}
                        text=""
                      />
                    </Box>
                  </FormSection>
                </FlexBox>
                <Input
                  labelText="Cycle name"
                  fieldName={`${cycleFieldNamePrefix}].name`}
                  placeholder="Cycle name"
                />
                <Input
                  labelText="Cycle description"
                  fieldName={`${cycleFieldNamePrefix}].description`}
                  placeholder="Cycle description"
                />
                <TrainingSessionsArray
                  phaseIndex={phaseIndex}
                  cycleIndex={cycleIndex}
                />
              </Box>
            );
          })}
          <AddButton
            add={() =>
              cyclesArrayHelpers.push({
                ...newCycle,
                sortOrder: cycles.length,
              })
            }
            text="add cycle"
          />
        </Box>
      )}
    />
  );
};
