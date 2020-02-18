import React, { useEffect } from "react";
import {
  Workout,
  IntensityUnit,
  IntervalType,
  Workset,
  IntensityType
} from "../../types";
import {
  FieldArray,
  FieldArrayRenderProps,
  useFormikContext,
  FormikProps
} from "formik";
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
import { exercisesOptions, exercises, intervalTypeOptions } from "../../data";
import { SingleWorksetLabelWithExercise } from "../labelComponents";
import Collapsible from "react-collapsible";
import { workoutFormTriggerStyle } from "./formStyles";
import { FormButton } from "./buttons";
import { FaPercentage, FaHashtag } from "react-icons/fa";

type WorksetFieldsProps = {
  workset: Workset;
  workgroupIndex: number;
  roundIndex: number;
  worksetIndex: number;
  worksetsArrayHelpers: FieldArrayRenderProps;
  name: string;
};

const WorksetFields: React.FC<WorksetFieldsProps> = ({
  workset,
  workgroupIndex,
  roundIndex,
  worksetIndex,
  worksetsArrayHelpers,
  name
}) => {
  const { setFieldValue, values }: FormikProps<Workout> = useFormikContext();
  const toggleIntensityType = (worksetIndex: number) => {
    setFieldValue(
      `${name}[${worksetIndex}].intensityType`,
      workset.intensityType === IntensityType.absolute
        ? IntensityType.relative
        : IntensityType.absolute
    );
  };
  const exercise = exercises.find(
    exercise =>
      exercise.name ===
      values.workgroups[workgroupIndex].rounds[roundIndex].worksets[
        worksetIndex
      ].exercise.name
  );
  const worksetFieldNamePrefix = `${name}[${worksetIndex}]`;
  useEffect(() => {
    setFieldValue(
      `${worksetFieldNamePrefix}.exercise.intensityUnit`,
      exercise?.intensityUnit
    );
  }, [exercise, setFieldValue, worksetFieldNamePrefix]);
  const intensityLabelText =
    workset.intensityType === IntensityType.relative
      ? "%1rm"
      : exercise?.intensityUnit === IntensityUnit.weight
      ? "load (lbs)"
      : exercise?.intensityUnit === IntensityUnit.speed
      ? "speed (m/s)"
      : "intensity";
  const repsDistanceLabelText =
    exercise?.intensityUnit === IntensityUnit.weight ? "Reps" : "Distance";
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
              values.workgroups[workgroupIndex].rounds[roundIndex].worksets
                .length -
                1 ? (
                <SwapDownButton
                  swap={worksetsArrayHelpers.swap}
                  index={worksetIndex}
                />
              ) : null}
            </div>
            <div>
              {`Set ${worksetIndex + 1}`}
              <FormButton
                type="button"
                bgColor={
                  workset.intensityType === IntensityType.absolute
                    ? "yellow"
                    : "purple"
                }
                hoverColor={
                  workset.intensityType === IntensityType.absolute
                    ? "yellow"
                    : "purple"
                }
                onClick={() => toggleIntensityType(worksetIndex)}
              >
                {workset.intensityType === IntensityType.absolute ? (
                  <FaHashtag />
                ) : (
                  <FaPercentage />
                )}
              </FormButton>
            </div>
          </div>
          {values.workgroups[workgroupIndex].rounds[roundIndex].worksets
            .length !== 1 ? (
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
              labelText={repsDistanceLabelText}
              fieldName={`${worksetFieldNamePrefix}.reps`}
            />
            <Input
              labelText={intensityLabelText}
              fieldName={`${worksetFieldNamePrefix}.intensity`}
            />
            {workset.intervalType !== IntervalType.none ? (
              <Input
                labelText="Interval time"
                fieldName={`${worksetFieldNamePrefix}.interval`}
              />
            ) : null}
          </div>
        </div>
      </Collapsible>
    </div>
  );
};

type WorksetsArrayProps = {
  name: string;
  workgroupIndex: number;
  roundIndex: number;
};
const WorksetsArray: React.FC<WorksetsArrayProps> = ({
  name,
  workgroupIndex,
  roundIndex
}) => {
  const { values }: FormikProps<Workout> = useFormikContext();
  return (
    <FieldArray
      name={name}
      render={worksetsArrayHelpers => {
        const worksets =
          values.workgroups[workgroupIndex].rounds[roundIndex].worksets;
        return (
          <div>
            {worksets.map((workset, worksetIndex) => (
              <WorksetFields
                key={`${name}workset${worksetIndex}`}
                workset={workset}
                workgroupIndex={workgroupIndex}
                roundIndex={roundIndex}
                worksetIndex={worksetIndex}
                name={name}
                worksetsArrayHelpers={worksetsArrayHelpers}
              />
            ))}
            <AddButton
              add={() =>
                worksetsArrayHelpers.push({
                  ...worksets[worksets.length - 1],
                  sortOrder: worksets.length
                })
              }
              text="add a set"
            />
          </div>
        );
      }}
    />
  );
};

export default WorksetsArray;