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
  exercisesOptions,
  ordinals,
  newRound,
  newWorkset
} from "../../data";
import { FaTimes, FaPlus, FaArrowLeft } from "react-icons/fa";

interface WorkoutFormProps {
  workout: Workout;
  hideForm: () => void;
}

const labelStyle = "block text-gray-700 text-sm font-bold";
type LabelProps = {
  label: string;
};
const Label: React.FC<LabelProps> = ({ label }) => (
  <div className={labelStyle}>{label}</div>
);
type AddButtonProps = {
  add: (arg0: object) => void;
  item: object;
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  text?: string;
};
const AddButton: React.FC<AddButtonProps> = ({
  add,
  item,
  hoverColor,
  bgColor,
  textColor,
  text
}) => (
  <button
    className={`bg-${bgColor ? bgColor : null}-300 hover:bg-${
      hoverColor ? hoverColor : bgColor
    }-400 text-${
      textColor ? textColor : "gray"
    }-800 py-1 px-2 rounded inline-flex items-center`}
    type="button"
    onClick={() => add(item)}
  >
    <FaPlus />
    {text ? text : null}
  </button>
);
type RemoveButtonProps = {
  remove: (arg0: number) => void;
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  index: number;
  text?: string;
};
const RemoveButton: React.FC<RemoveButtonProps> = ({
  remove,
  hoverColor,
  bgColor,
  textColor,
  index,
  text
}) => (
  <button
    className={`bg-${bgColor ? bgColor : null}-300 hover:bg-${
      hoverColor ? hoverColor : bgColor
    }-400 text-${
      textColor ? textColor : "gray"
    }-800 py-1 px-2 rounded inline-flex items-center`}
    type="button"
    onClick={() => remove(index)}
  >
    <FaTimes />
    {text ? text : null}
  </button>
);
type SubmitButtonProps = {
  isSubmitting: boolean;
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  text?: string;
};
const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  hoverColor,
  bgColor,
  textColor,
  text
}) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`bg-${bgColor ? bgColor : null}-300 hover:bg-${
      hoverColor ? hoverColor : bgColor
    }-400 text-${
      textColor ? textColor : "gray"
    }-800 py-1 px-2 rounded inline-flex items-center`}
  >
    {text ? text : "Submit"}
  </button>
);
const sectionStyle = "border-solid border-2 border-gray-600 rounded m-1 p-1";
const sectionTitleStyle = "text-lg font-bold";
const selectStyle =
  "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline my-2";
const fieldStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2";
const InnerForm = (props: WorkoutFormProps & FormikProps<Workout>) => {
  const { touched, errors, isSubmitting, values, hideForm } = props;
  return (
    <Form className="p-3">
      <button
        onClick={() => hideForm()}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold px-2 py-1 mt-3 mx-3 rounded"
      >
        <FaArrowLeft />
      </button>
      <div>
        <Label label="Workout Name" />
        <Field className={fieldStyle} name="name" />
        {touched.name && errors.name && <div>{errors.name}</div>}
      </div>
      <div>
        <Label label="Workout Description" />
        <Field className={fieldStyle} name="description" />
      </div>

      <FieldArray
        name="workgroups"
        render={workgroupsArrayHelpers => (
          <div>
            {values.workgroups.map((workgroup, workgroupIndex) => (
              <div className={sectionStyle} key={`wg${workgroupIndex}`}>
                <div className="flex justify-between">
                  <div className={sectionTitleStyle}>
                    {`Workgroup ${ordinals[workgroupIndex]}`}
                  </div>
                  <RemoveButton
                    remove={workgroupsArrayHelpers.remove}
                    text="remove"
                    textColor="gray"
                    bgColor="gray"
                    hoverColor="red"
                    index={workgroupIndex}
                  />
                </div>
                <div>
                  <Label label="Workgroup notes" />
                  <Field
                    className={fieldStyle}
                    name={`workgroups.${workgroupIndex}.notes`}
                    placeholder="Type notes here..."
                  />
                </div>

                <FieldArray
                  name="rounds"
                  render={roundsArrayHelpers => (
                    <div>
                      {workgroup.rounds.map((round, roundIndex) => (
                        <div
                          className={sectionStyle}
                          key={`wg${workgroupIndex}rd${roundIndex}`}
                        >
                          <div className="flex justify-between">
                            <div className={sectionTitleStyle}>
                              {`Round ${roundIndex + 1}`}
                            </div>
                            <RemoveButton
                              remove={roundsArrayHelpers.remove}
                              text="remove"
                              textColor="gray"
                              bgColor="gray"
                              hoverColor="red"
                              index={roundIndex}
                            />
                          </div>
                          <div className="flex">
                            <div>
                              <Label label="Interval type" />
                              <Field
                                as="select"
                                className={selectStyle}
                                name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.intervalType`}
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
                            </div>
                            <div>
                              <Label label="Interval time" />
                              <Field
                                className={fieldStyle}
                                name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.interval`}
                              />
                            </div>
                          </div>

                          <FieldArray
                            name="worksets"
                            render={worksetsArrayHelpers => (
                              <div>
                                {round.worksets.map(
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
                                          bgColor="gray"
                                          hoverColor="red"
                                          index={worksetIndex}
                                        />
                                      </div>
                                      <div>
                                        <div>
                                          <Label label="Exercise" />
                                          <Field
                                            as="select"
                                            className={selectStyle}
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
                                        </div>
                                        <div className="flex">
                                          <div>
                                            <Label label="Reps" />
                                            <Field
                                              className={fieldStyle}
                                              name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.reps`}
                                            />
                                          </div>
                                          <div>
                                            <Label label="Intensity/load" />
                                            <Field
                                              className={fieldStyle}
                                              name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.intensity`}
                                            />
                                          </div>
                                          <div>
                                            <Label label="Intensity unit" />
                                            <Field
                                              as="select"
                                              className={selectStyle}
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
                                          </div>
                                        </div>
                                        <div>
                                          <Label label="Relative intensity" />
                                          <Field
                                            className={fieldStyle}
                                            name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.relativeIntensity`}
                                          />
                                        </div>
                                        <div className="flex">
                                          <div>
                                            <Label label="Interval type" />
                                            <Field
                                              as="select"
                                              className={selectStyle}
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
                                          </div>
                                          <div>
                                            <Label label="Interval time" />
                                            <Field
                                              className={fieldStyle}
                                              name={`workgroups.${workgroupIndex}.rounds.${roundIndex}.worksets.${worksetIndex}.interval`}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                                <AddButton
                                  add={worksetsArrayHelpers.push}
                                  item={{
                                    ...newWorkset,
                                    sortOrder:
                                      values.workgroups[workgroupIndex].rounds[
                                        roundIndex
                                      ].worksets.length
                                  }}
                                  text="add a set"
                                  textColor="gray"
                                  bgColor="gray"
                                  hoverColor="blue"
                                />
                              </div>
                            )}
                          />
                        </div>
                      ))}
                      <AddButton
                        add={roundsArrayHelpers.push}
                        item={{
                          ...newRound,
                          sortOrder:
                            values.workgroups[workgroupIndex].rounds.length,
                          worksets: [{ ...newWorkset }]
                        }}
                        text="add round"
                        textColor="gray"
                        bgColor="gray"
                        hoverColor="blue"
                      />
                    </div>
                  )}
                />
              </div>
            ))}
            <AddButton
              add={workgroupsArrayHelpers.push}
              item={{
                ...newWorkgroup,
                sortOrder: values.workgroups.length
              }}
              text="add workgroup"
              textColor="gray"
              bgColor="gray"
              hoverColor="blue"
            />
          </div>
        )}
      />
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
  mapPropsToValues: props => {
    return props.workout;
  },
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
