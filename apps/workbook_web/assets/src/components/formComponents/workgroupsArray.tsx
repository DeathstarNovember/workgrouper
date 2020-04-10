import React from "react";
import { Workout, Exercise } from "../../types";
import { FieldArray, useFormikContext } from "formik";
import Collapsible from "react-collapsible";
import { ordinals, newWorkgroup } from "../../data";
import { Input, RoundsArray } from ".";
import { RxWorkgroupLabel } from "../labelComponents";
import {
  FormSection,
  SectionStyles,
  FlexBox,
  Box,
  RemoveButton,
  AddButton,
  SwapUpButton,
  SwapDownButton
} from "../../workbook_ui";

type WorkgroupsArrayProps = {
  exercises: Exercise[];
};

export const WorkgroupsArray: React.FC<WorkgroupsArrayProps> = ({
  exercises
}) => {
  const { values }: { values: Workout } = useFormikContext();
  return (
    <FieldArray
      name="workgroups"
      render={workgroupsArrayHelpers => (
        <Box>
          {values.workgroups.map((workgroup, workgroupIndex) => {
            const workgroupFieldNamePrefix = `workgroups[${workgroupIndex}]`;
            return (
              <FormSection
                sectionStyle={SectionStyles.baseSection}
                key={`wg${workgroupIndex}`}
              >
                <Collapsible
                  trigger={
                    <FormSection sectionStyle={SectionStyles.sectionTrigger}>
                      <RxWorkgroupLabel
                        workgroup={workgroup}
                        workoutIndex={0}
                        workgroupIndex={workgroupIndex}
                      />
                    </FormSection>
                  }
                >
                  <FlexBox className="justify-between">
                    <FormSection sectionStyle={SectionStyles.sectionTitle}>
                      <Box>{`Workgroup ${ordinals[workgroupIndex]}`}</Box>
                      <Box>
                        {workgroupIndex !== 0 ? (
                          <SwapUpButton
                            swap={workgroupsArrayHelpers.swap}
                            index={workgroupIndex}
                          />
                        ) : null}
                        {workgroupIndex !== values.workgroups.length - 1 ? (
                          <SwapDownButton
                            swap={workgroupsArrayHelpers.swap}
                            index={workgroupIndex}
                          />
                        ) : null}
                        <RemoveButton
                          remove={workgroupsArrayHelpers.remove}
                          index={workgroupIndex}
                          text=""
                        />
                      </Box>
                    </FormSection>
                  </FlexBox>
                  <Input
                    labelText="Workgroup notes"
                    fieldName={`${workgroupFieldNamePrefix}].note`}
                    placeholder="Type notes here..."
                  />
                  <RoundsArray
                    workgroupIndex={workgroupIndex}
                    name={`${workgroupFieldNamePrefix}.rounds`}
                    exercises={exercises}
                  />
                </Collapsible>
              </FormSection>
            );
          })}
          <AddButton
            add={() =>
              workgroupsArrayHelpers.push({
                ...newWorkgroup,
                sortOrder: values.workgroups.length
              })
            }
            text="add workgroup"
          />
        </Box>
      )}
    />
  );
};
