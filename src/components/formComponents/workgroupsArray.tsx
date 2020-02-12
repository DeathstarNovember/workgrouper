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

type WorkgroupsArrayProps = {
  values: Workout;
};

export const WorkgroupsArray: React.FC<WorkgroupsArrayProps> = ({ values }) => (
  <FieldArray
    name="workgroups"
    render={workgroupsArrayHelpers => (
      <div>
        {values.workgroups.map((_workgroup, workgroupIndex) => (
          <div className={sectionStyle} key={`wg${workgroupIndex}`}>
            <div className="flex justify-between">
              <div className={sectionTitleStyle}>
                {`Workgroup ${ordinals[workgroupIndex]}`}
              </div>
              <RemoveButton
                remove={workgroupsArrayHelpers.remove}
                text="remove"
                textColor="gray"
                bgColor="red"
                hoverColor="red"
                index={workgroupIndex}
              />
            </div>
            <Input
              labelText="Workgroup notes"
              fieldName={`workgroups.${workgroupIndex}.notes`}
              placeholder="Type notes here..."
            />
            <RoundsArray values={values} workgroupIndex={workgroupIndex} />
          </div>
        ))}
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
