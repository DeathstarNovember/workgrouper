import React from "react";
import { Workout } from "../../types";
import { FieldArray } from "formik";
import { ordinals, newWorkgroup } from "../../data";
import {
  RemoveButton,
  Input,
  AddButton,
  sectionStyle,
  sectionTitleStyle
} from ".";
import { RoundsArray } from "./roundsArray";
import { SwapUpButton, SwapDownButton } from "./buttons";
import { RxWorkgroupLabel } from "../labelComponents";

type WorkgroupsArrayProps = {
  values: Workout;
};

export const WorkgroupsArray: React.FC<WorkgroupsArrayProps> = ({ values }) => (
  <FieldArray
    name="workgroups"
    render={workgroupsArrayHelpers => (
      <div>
        {values.workgroups.map((workgroup, workgroupIndex) => {
          const workgroupFieldNamePrefix = `workgroups[${workgroupIndex}]`;
          return (
            <div className={sectionStyle} key={`wg${workgroupIndex}`}>
              <div className="flex justify-between">
                <div className={sectionTitleStyle}>
                  <div>
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
                  </div>
                  {`Workgroup ${ordinals[workgroupIndex]}`}
                </div>
                <RemoveButton
                  remove={workgroupsArrayHelpers.remove}
                  index={workgroupIndex}
                />
              </div>
              <RxWorkgroupLabel
                workgroup={workgroup}
                workoutIndex={0}
                workgroupIndex={workgroupIndex}
              />
              <Input
                labelText="Workgroup notes"
                fieldName={`${workgroupFieldNamePrefix}].note`}
                placeholder="Type notes here..."
              />
              <RoundsArray
                values={values}
                workgroupIndex={workgroupIndex}
                name={`${workgroupFieldNamePrefix}.rounds`}
              />
            </div>
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
      </div>
    )}
  />
);
