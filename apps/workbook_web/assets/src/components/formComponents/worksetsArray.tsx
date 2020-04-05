import React, { useEffect } from "react";
import { FaPercentage, FaHashtag } from "react-icons/fa";
import {
  Workout,
  IntensityUnit,
  IntervalType,
  Workset,
  IntensityType,
  Exercise,
  NewWorkout
} from "../../types";
import { exercisesOptions, intervalTypeOptions } from "../../data";
import {
  FieldArray,
  FieldArrayRenderProps,
  useFormikContext,
  FormikProps
} from "formik";
import Collapsible from "react-collapsible";
import { Select, Input } from ".";
import { SingleWorksetLabelWithExercise } from "../labelComponents";
import {
  ButtonStyles,
  RemoveButton,
  SwapUpButton,
  Button,
  SwapDownButton,
  Box,
  FlexBox,
  FormSection,
  SectionStyles
} from "../layoutComponents";

type WorksetFieldsProps = {
  workset: Workset;
  workgroupIndex: number;
  roundIndex: number;
  worksetIndex: number;
  worksetsArrayHelpers: FieldArrayRenderProps;
  name: string;
  exercises: Exercise[];
};

const WorksetFields: React.FC<WorksetFieldsProps> = ({
  workset,
  workgroupIndex,
  roundIndex,
  worksetIndex,
  worksetsArrayHelpers,
  name,
  exercises
}) => {
  const {
    setFieldValue,
    values
  }: FormikProps<Workout | NewWorkout> = useFormikContext();
  const toggleIntensityType = (worksetIndex: number) => {
    setFieldValue(
      `${name}[${worksetIndex}].intensityType`,
      workset.intensityType === IntensityType.absolute
        ? IntensityType.relative
        : IntensityType.absolute
    );
  };
  const exercise =
    exercises.find(exercise => exercise.id === workset.exercise.id) ||
    exercises[0];
  const exerciseSelectOptions = exercisesOptions(exercises);
  const worksetFieldNamePrefix = `${name}[${worksetIndex}]`;
  useEffect(() => {
    setFieldValue(
      `${worksetFieldNamePrefix}.exercise.intensityUnit`,
      exercise.intensityUnit
    );
    setFieldValue(`${worksetFieldNamePrefix}.exercise.name`, exercise.name);
  }, [exercise, setFieldValue, worksetFieldNamePrefix]);
  const intensityLabelText =
    workset.intensityType === IntensityType.relative
      ? "%1rm"
      : exercise.intensityUnit === IntensityUnit.weight
      ? "load (lbs)"
      : exercise.intensityUnit === IntensityUnit.speed
      ? "speed (m/s)"
      : "intensity";
  const intervalRestLabelText =
    Number(workset.intervalType) === IntervalType.inclusive
      ? "Interval time"
      : "Rest time";
  const repsDistanceLabelText =
    exercise?.intensityUnit === IntensityUnit.weight ? "Reps" : "Distance";
  return (
    <FormSection
      sectionStyle={SectionStyles.worksetSection}
      key={`wg${workgroupIndex}rd${roundIndex}ws${worksetIndex}`}
    >
      <FormSection sectionStyle={SectionStyles.sectionTitle}>
        <Box>{`Set ${worksetIndex + 1}`}</Box>
        <Box>
          {worksetIndex !== 0 ? (
            <SwapUpButton
              swap={worksetsArrayHelpers.swap}
              index={worksetIndex}
            />
          ) : null}
          {worksetIndex !==
          values.workgroups[workgroupIndex].rounds[roundIndex].worksets.length -
            1 ? (
            <SwapDownButton
              swap={worksetsArrayHelpers.swap}
              index={worksetIndex}
            />
          ) : null}
          <Button
            buttonStyle={ButtonStyles.secondary}
            onClick={() => toggleIntensityType(worksetIndex)}
          >
            {workset.intensityType === IntensityType.absolute ? (
              <FaHashtag />
            ) : (
              <FaPercentage />
            )}
          </Button>
          {values.workgroups[workgroupIndex].rounds[roundIndex].worksets
            .length !== 1 ? (
            <RemoveButton
              remove={worksetsArrayHelpers.remove}
              index={worksetIndex}
              text=""
            />
          ) : null}
        </Box>
      </FormSection>
      <Collapsible
        trigger={
          <FormSection sectionStyle={SectionStyles.sectionTrigger}>
            <SingleWorksetLabelWithExercise workset={workset} />
          </FormSection>
        }
      >
        <Box>
          <FlexBox>
            <Select
              labelText="Exercise"
              options={exerciseSelectOptions}
              fieldName={`${worksetFieldNamePrefix}.exercise.id`}
            />
            <Select
              labelText="Interval type"
              options={intervalTypeOptions}
              fieldName={`${worksetFieldNamePrefix}.intervalType`}
            />
          </FlexBox>
          <FlexBox>
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
                labelText={intervalRestLabelText}
                fieldName={`${worksetFieldNamePrefix}.interval`}
              />
            ) : null}
          </FlexBox>
        </Box>
      </Collapsible>
    </FormSection>
  );
};

type WorksetsArrayProps = {
  name: string;
  workgroupIndex: number;
  roundIndex: number;
  exercises: Exercise[];
};
export const WorksetsArray: React.FC<WorksetsArrayProps> = ({
  name,
  workgroupIndex,
  roundIndex,
  exercises
}) => {
  const { values }: FormikProps<Workout> = useFormikContext();

  return (
    <FieldArray
      name={name}
      render={worksetsArrayHelpers => {
        const worksets =
          values.workgroups[workgroupIndex].rounds[roundIndex].worksets;
        return (
          <Box>
            {worksets.map((workset, worksetIndex) => (
              <WorksetFields
                key={`${name}workset${worksetIndex}`}
                workset={workset}
                workgroupIndex={workgroupIndex}
                roundIndex={roundIndex}
                worksetIndex={worksetIndex}
                name={name}
                worksetsArrayHelpers={worksetsArrayHelpers}
                exercises={exercises}
              />
            ))}
            <Button
              onClick={() =>
                worksetsArrayHelpers.push({
                  ...worksets[worksets.length - 1],
                  sortOrder: worksets.length
                })
              }
              buttonStyle={ButtonStyles.secondary}
              text="add a set"
            />
          </Box>
        );
      }}
    />
  );
};
