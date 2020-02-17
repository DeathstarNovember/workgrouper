import React from "react";
import * as Yup from "yup";
import { withFormik, FormikProps, Form } from "formik";
import { Workout } from "../../types";
import { FaArrowLeft } from "react-icons/fa";
import { SubmitButton, Input, WorkgroupsArray } from ".";

interface WorkoutFormProps {
  workout: Workout;
  hideForm: () => void;
}

const InnerForm = (props: WorkoutFormProps & FormikProps<Workout>) => {
  const { setFieldValue, isSubmitting, values, hideForm, handleSubmit } = props;

  const setWorkoutSortOrders = (values: Workout) => {
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
        });
      });
    });
  };

  return (
    <Form className="p-3 w-full max-w-lg" onSubmit={handleSubmit}>
      <button
        onClick={hideForm}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 py-1 rounded"
      >
        <FaArrowLeft />
      </button>
      <div>
        <Input labelText="WorkoutName" fieldName="name" />
      </div>
      <Input labelText="Workout Description" fieldName="description" />
      <WorkgroupsArray values={values} />
      <SubmitButton
        isSubmitting={isSubmitting}
        onClick={() => setWorkoutSortOrders(values)}
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
  enableReinitialize: true,
  mapPropsToValues: ({ workout }) => ({ ...workout }),
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Your workout must have a name."),
    description: Yup.string(),
    workgroups: Yup.array().of(
      Yup.object().shape({
        sortOrder: Yup.number().required(),
        note: Yup.string(),
        rounds: Yup.array().of(
          Yup.object().shape({
            sortOrder: Yup.number().required(),
            interval: Yup.number(),
            intervalType: Yup.number(),
            worksets: Yup.array().of(
              Yup.object().shape({
                reps: Yup.number()
                  .positive()
                  .integer()
                  .required("Reps must be positive."),
                intensity: Yup.number()
                  .positive()
                  .required("Intensity must be positive"),
                relativeIntensity: Yup.number()
                  .positive()
                  .required("Relative intensity must be positive."),
                intensityUnit: Yup.number().required(
                  "The unit of intensity is not specified for this set."
                ),
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

  handleSubmit: values => {
    console.warn({ values });
  }
})(InnerForm);
