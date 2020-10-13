import React from "react";
import { Program } from "../../types";
import { FieldArray, useFormikContext } from "formik";
import Collapsible from "react-collapsible";
import { ordinals, newPhase } from "../../data";
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
import { CyclesArray } from "./CyclesArray";

type PhasesArrayProps = {};

export const PhasesArray: React.FC<PhasesArrayProps> = ({}) => {
  const { values }: { values: Program } = useFormikContext();
  return (
    <FieldArray
      name="phases"
      render={(phasesArrayHelpers) => (
        <Box>
          {values.phases.map((_phase, phaseIndex) => {
            const phaseFieldNamePrefix = `phases[${phaseIndex}]`;
            return (
              <Box key={`wg${phaseIndex}`}>
                <FlexBox className="justify-between">
                  <FormSection sectionStyle={SectionStyles.sectionTitle}>
                    <Box>
                      {phaseIndex !== 0 ? (
                        <SwapUpButton
                          swap={phasesArrayHelpers.swap}
                          index={phaseIndex}
                        />
                      ) : null}
                      {phaseIndex !== values.phases.length - 1 ? (
                        <SwapDownButton
                          swap={phasesArrayHelpers.swap}
                          index={phaseIndex}
                        />
                      ) : null}
                      <RemoveButton
                        remove={phasesArrayHelpers.remove}
                        index={phaseIndex}
                        text=""
                      />
                    </Box>
                  </FormSection>
                </FlexBox>
                <Input
                  labelText="Phase name"
                  fieldName={`${phaseFieldNamePrefix}].name`}
                  placeholder="Phase Name"
                />
                <Input
                  labelText="Phase description"
                  fieldName={`${phaseFieldNamePrefix}].description`}
                  placeholder="Phase Description"
                />
                <CyclesArray phaseIndex={phaseIndex} />
              </Box>
            );
          })}
          <AddButton
            add={() =>
              phasesArrayHelpers.push({
                ...newPhase,
                sortOrder: values.phases.length,
              })
            }
            text="add phase"
          />
        </Box>
      )}
    />
  );
};
