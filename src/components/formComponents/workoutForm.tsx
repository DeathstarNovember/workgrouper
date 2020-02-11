import React from "react";
import * as Yup from "yup";
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  FieldArray
} from "formik";
import { Workout } from "../../types";
import {
  newWorkgroup,
  intervalTypeOptions,
  intensityTypeOptions,
  exercisesOptions
} from "../../data";
import { FaTimes, FaPlus } from "react-icons/fa";

interface WorkoutFormProps {
  workout: Workout;
  hideForm: () => void;
}
const InnerForm = (props: WorkoutFormProps & FormikProps<Workout>) => {
  const { touched, errors, isSubmitting, workout } = props;
  return (
    <Form className="bg-gray-300 rounded p-3">
      <Field name="name" />
      {touched.name && errors.name && <div>{errors.name}</div>}
      <Field name="description" />

      <FieldArray
        name="workgroups"
        render={workgroupsArrayHelpers => (
          <div className="bg-gray-400 rounded p-3">
            {workout.workgroups.map((workgroup, workgroupIndex) => (
              <div key={`wg${workgroupIndex}`}>
                <Field name={`workgroups.${workgroupIndex}.notes`} />

                <FieldArray
                  name="rounds"
                  render={roundsArrayHelpers => (
                    <div className="bg-gray-500 rounded p-3">
                      {workgroup.rounds.map((round, roundIndex) => (
                        <div key={`wg${workgroupIndex}rd${roundIndex}`}>
                          <Field
                            as="select"
                            name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.intervalType`}
                          >
                            {intervalTypeOptions.map((option, optionIndex) => (
                              <option key={optionIndex} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Field>
                          <Field
                            name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.interval`}
                          />

                          <FieldArray
                            name="worksets"
                            render={worksetArrayHelpers => (
                              <div className="bg-gray-600 rounded p-3">
                                {round.worksets.map((workset, worksetIndex) => (
                                  <div
                                    key={`wg${workgroupIndex}rd${roundIndex}ws${worksetIndex}`}
                                  >
                                    <Field
                                      as="select"
                                      name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.exercise.name`}
                                    >
                                      {exercisesOptions.map(
                                        (option, optionIndex) => (
                                          <option
                                            key={optionIndex}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </option>
                                        )
                                      )}
                                    </Field>
                                    <Field
                                      name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.reps`}
                                    />
                                    <Field
                                      name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.intensity`}
                                    />
                                    <Field
                                      as="select"
                                      name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.intensityUnit`}
                                    >
                                      {intensityTypeOptions.map(
                                        (option, optionIndex) => (
                                          <option
                                            key={optionIndex}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </option>
                                        )
                                      )}
                                    </Field>
                                    <Field
                                      name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.relativeIntensity`}
                                    />
                                    <Field
                                      as="select"
                                      name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.intervalType`}
                                    >
                                      {intervalTypeOptions.map(
                                        (option, optionIndex) => (
                                          <option
                                            key={optionIndex}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </option>
                                        )
                                      )}
                                    </Field>
                                    <Field
                                      name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.interval`}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                />
                <button
                  type="button"
                  onClick={() => workgroupsArrayHelpers.remove(workgroupIndex)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                workgroupsArrayHelpers.push({
                  ...newWorkgroup,
                  sortOrder: workout.workgroups.length
                })
              }
            >
              <FaPlus />
            </button>
          </div>
        )}
      />
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

// The type of props WorkoutForm receives

export const WorkoutForm = withFormik<WorkoutFormProps, Workout>({
  mapPropsToValues: props => {
    return {
      name: props.workout.name || "",
      description: props.workout.description || "",
      workgroups: props.workout.workgroups || []
    };
  },

  validate: (values: Workout) => {
    let errors: FormikErrors<Workout> = {};
    if (!values.name) {
      errors.name = "Required";
    }
    return errors;
  },

  handleSubmit: values => {
    console.warn({ values });
  }
})(InnerForm);
