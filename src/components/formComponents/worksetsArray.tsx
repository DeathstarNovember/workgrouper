import React from "react";
import { Workout, IntensityUnit } from "../../types";
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
import { workoutFormTriggerStyle } from "./formStyles";

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
            const intensityLabelText =
              workset.exercise.intensityUnit === IntensityUnit.pounds
                ? "load"
                : workset.exercise.intensityUnit === IntensityUnit.meters
                ? "distance"
                : workset.exercise.intensityUnit === IntensityUnit.seconds
                ? "duration"
                : workset.exercise.intensityUnit === IntensityUnit.none
                ? ""
                : "";
            return (
              <div
                className={sectionStyle}
                key={`wg${workgroupIndex}rd${roundIndex}ws${worksetIndex}`}
              >
                <Collapsible
                  trigger={
                    <div className={workoutFormTriggerStyle}>
                      <SingleWorksetLabelWithExercise workset={workset} />
                    </div>
                  }
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
                    {values.workgroups[workgroupIndex].rounds[roundIndex]
                      .worksets.length !== 1 ? (
                      <RemoveButton
                        remove={worksetsArrayHelpers.remove}
                        index={worksetIndex}
                        text=""
                      />
                    ) : null}
                  </div>
                  <div>
                    <div className="flex">
                      <Select
                        labelText="Exercise"
                        options={exercisesOptions}
                        fieldName={`${worksetFieldNamePrefix}.exercise.name`}
                      />
                      <Select
                        labelText="Interval type"
                        options={intervalTypeOptions}
                        fieldName={`${worksetFieldNamePrefix}.intervalType`}
                      />
                    </div>
                    <div className="flex">
                      <Input
                        labelText="Reps"
                        fieldName={`${worksetFieldNamePrefix}.reps`}
                      />{" "}
                      <Input
                        labelText={intensityLabelText}
                        fieldName={`${worksetFieldNamePrefix}.intensity`}
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
