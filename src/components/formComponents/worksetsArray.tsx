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
import {
  exercisesOptions,
  intensityTypeOptions,
  intervalTypeOptions
} from "../../data";
import { SingleWorksetLabelWithExercise } from "../labelComponents";
import Collapsible from "react-collapsible";

type WorksetsArrayProps = {
  values: Workout;
  name: string;
  workgroupIndex: number;
  roundIndex: number;
};
const WorksetsArray: React.FC<WorksetsArrayProps> = ({
  values,
  name,
  workgroupIndex,
  roundIndex
}) => (
  <FieldArray
    name={name}
    render={worksetsArrayHelpers => (
      <div>
        {values.workgroups[workgroupIndex].rounds[roundIndex].worksets.map(
          (workset, worksetIndex) => {
            const worksetFieldNamePrefix = `${name}[${worksetIndex}]`;
            return (
              <div
                className={sectionStyle}
                key={`wg${workgroupIndex}rd${roundIndex}ws${worksetIndex}`}
              >
                <Collapsible
                  trigger={<SingleWorksetLabelWithExercise workset={workset} />}
                >
                  <div className="flex justify-between">
                    <div className={sectionTitleStyle}>
                      <div>
                        {worksetIndex !== 0 ? (
                          <SwapUpButton
                            swap={worksetsArrayHelpers.swap}
                            index={worksetIndex}
                          />
                        ) : null}
                        {worksetIndex !==
                        values.workgroups[workgroupIndex].rounds[roundIndex]
                          .worksets.length -
                          1 ? (
                          <SwapDownButton
                            swap={worksetsArrayHelpers.swap}
                            index={worksetIndex}
                          />
                        ) : null}
                      </div>
                      {`Set ${worksetIndex + 1}`}
                    </div>
                    <RemoveButton
                      remove={worksetsArrayHelpers.remove}
                      index={worksetIndex}
                      text=""
                    />
                  </div>
                  <div>
                    <Select
                      labelText="Exercise"
                      options={exercisesOptions}
                      fieldName={`${worksetFieldNamePrefix}.exercise.name`}
                    />
                    <div className="flex">
                      <Input
                        labelText="Reps"
                        fieldName={`${worksetFieldNamePrefix}.reps`}
                      />
                      <Input
                        labelText="Intensity/load"
                        fieldName={`${worksetFieldNamePrefix}.intensity`}
                      />
                      <Select
                        labelText="Intensity unit"
                        options={intensityTypeOptions}
                        fieldName={`${worksetFieldNamePrefix}.intensityUnit`}
                      />
                    </div>
                    <Input
                      labelText="Relative intensity"
                      fieldName={`${worksetFieldNamePrefix}.relativeIntensity`}
                    />
                    <div className="flex">
                      <Select
                        labelText="Interval type"
                        options={intervalTypeOptions}
                        fieldName={`${worksetFieldNamePrefix}.intervalType`}
                      />
                      <Input
                        labelText="Interval time"
                        fieldName={`${worksetFieldNamePrefix}.interval`}
                      />
                    </div>
                  </div>
                </Collapsible>
              </div>
            );
          }
        )}
        <AddButton
          add={() =>
            worksetsArrayHelpers.push({
              ...values.workgroups[workgroupIndex].rounds[roundIndex].worksets[
                values.workgroups[workgroupIndex].rounds[roundIndex].worksets
                  .length - 1
              ],
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
