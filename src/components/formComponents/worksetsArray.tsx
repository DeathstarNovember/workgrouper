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
import {
  exercisesOptions,
  intensityTypeOptions,
  intervalTypeOptions,
  newWorkset
} from "../../data";

type WorksetsArrayProps = {
  values: Workout;
  workgroupIndex: number;
  roundIndex: number;
};
const WorksetsArray: React.FC<WorksetsArrayProps> = ({
  values,
  workgroupIndex,
  roundIndex
}) => (
  <FieldArray
    name="worksets"
    render={worksetsArrayHelpers => (
      <div>
        {values.workgroups[workgroupIndex].rounds[roundIndex].worksets.map(
          (_workset, worksetIndex) => (
            <div
              className={sectionStyle}
              key={`wg${workgroupIndex}rd${roundIndex}ws${worksetIndex}`}
            >
              <div className="flex justify-between">
                <div className={sectionTitleStyle}>
                  {`Set ${worksetIndex + 1}`}
                </div>
                <RemoveButton
                  remove={worksetsArrayHelpers.remove}
                  text="remove"
                  textColor="gray"
                  bgColor="red"
                  hoverColor="red"
                  index={worksetIndex}
                />
              </div>
              <div>
                <Select
                  labelText="Exercise"
                  options={exercisesOptions}
                  fieldName={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.exercise.name`}
                />
                <div className="flex">
                  <Input
                    labelText="Reps"
                    fieldName={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.reps`}
                  />
                  <Input
                    labelText="Intensity/load"
                    fieldName={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.intensity`}
                  />
                  <Select
                    labelText="Intensity unit"
                    options={intensityTypeOptions}
                    fieldName={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.intensityUnit`}
                  />
                </div>
                <Input
                  labelText="Relative intensity"
                  fieldName={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.relativeIntensity`}
                />
                <div className="flex">
                  <Select
                    labelText="Interval type"
                    options={intervalTypeOptions}
                    fieldName={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.intervalType`}
                  />
                  <Input
                    labelText="Interval time"
                    fieldName={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.interval`}
                  />
                </div>
              </div>
            </div>
          )
        )}
        <AddButton
          add={() =>
            worksetsArrayHelpers.push({
              ...newWorkset,
              sortOrder:
                values.workgroups[workgroupIndex].rounds[roundIndex].worksets
                  .length
            })
          }
          text="add a set"
        />
      </div>
    )}
  />
);

export default WorksetsArray;
