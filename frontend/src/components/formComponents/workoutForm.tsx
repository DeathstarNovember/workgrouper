import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";
import { Workout } from "../../types";
import { FaTimes } from "react-icons/fa";
import { SubmitButton, Input, WorkgroupsArray } from ".";

interface WorkoutFormProps {
  workout: Workout;
  hideForm: () => void;
}

const InnerForm = (props: WorkoutFormProps & FormikProps<Workout>) => {
  const { isSubmitting, hideForm, handleSubmit } = props;

  return (
    <Form className="p-3 w-full max-w-lg" onSubmit={handleSubmit}>
      <button
        onClick={hideForm}
        className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded"
      >
        <FaTimes />
      </button>
      <div>
        <Input labelText="WorkoutName" fieldName="name" />
      </div>
      <Input labelText="Workout Description" fieldName="description" />
      <WorkgroupsArray />
      <SubmitButton
        isSubmitting={isSubmitting}
        bgColor="green"
        hoverColor="green"
        text="Save Workout"
        textColor="gray"
      />
    </Form>
  );
};

// The type of props WorkoutForm receives

export const WorkoutForm = withFormik<WorkoutFormProps, Workout>({
  mapPropsToValues: ({ workout }) => ({ ...workout }),
  validationSchema: Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    workgroups: Yup.array().of(
      Yup.object().shape({
        sortOrder: Yup.number().required(),
        note: Yup.string(),
        rounds: Yup.array().of(
          Yup.object().shape({
            sortOrder: Yup.number().required(),
            interval: Yup.number().required(),
            intervalType: Yup.number().required(),
            worksets: Yup.array().of(
              Yup.object().shape({
                reps: Yup.number()
                  .integer("must be a number")
                  .min(1, "must be positive")
                  .required("volume is required"),
                intensityType: Yup.number().required(),
                intensity: Yup.number()
                  .integer("must be a number")
                  .min(1, "must be positive")
                  .required("intensity is required"),
                intervalType: Yup.number().required(
                  "The type of time interval is not specified for this set."
                ),
                interval: Yup.number().required(
                  "The time interval is not specified for this set."
                )
              })
            )
          })
        )
      })
    )
  }),
  handleSubmit: (values, { setFieldValue }) => {
    values.workgroups.forEach((workgroup, workgroupIndex) => {
      setFieldValue(`workgroups[${workgroupIndex}].sortOrder`, workgroupIndex);
      workgroup.rounds.forEach((round, roundIndex) => {
        setFieldValue(
          `workgroups[${workgroupIndex}].rounds[${roundIndex}].sortOrder`,
          roundIndex
        );
        round.worksets.forEach((_workset, worksetIndex) => {
          setFieldValue(
            `workgroups[${workgroupIndex}].rounds[${roundIndex}].worksets[${worksetIndex}].sortOrder`,
            worksetIndex
          );
          // setFieldValue(`workgroups[${workgroupIndex}].rounds[${roundIndex}].worksets[${worksetIndex}].exercise`,)
        });
      });
    });
    //TODO:
    console.warn({ values });
  }
})(InnerForm);
