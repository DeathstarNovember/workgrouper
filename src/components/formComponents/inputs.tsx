import React from "react";
import { Field, ErrorMessage } from "formik";
import { SelectOption } from "../../types";
import { labelStyle, fieldStyle, selectStyle } from ".";

type WorkoutFormErrorProps = {
  name: string;
};

export const WorkoutFormError: React.FC<WorkoutFormErrorProps> = ({ name }) => {
  return <ErrorMessage name={name} />;
};

type LabelProps = {
  label: string;
};

export const Label: React.FC<LabelProps> = ({ label }) => (
  <div className={labelStyle}>{label}</div>
);

type InputProps = {
  labelText?: string;
  fieldName: string;
  placeholder?: string;
};

export const Input: React.FC<InputProps> = ({
  labelText,
  fieldName,
  ...props
}) => (
  <div>
    {labelText ? <Label label={labelText} /> : null}
    <Field className={fieldStyle} name={fieldName} {...props} />
    <WorkoutFormError name={fieldName} />
  </div>
);

type SelectProps = {
  options: SelectOption[];
  fieldName: string;
  labelText: string;
};
export const Select: React.FC<SelectProps> = ({
  options,
  fieldName,
  labelText
}) => (
  <div>
    <Label label={labelText} />
    <Field as="select" className={selectStyle} name={fieldName}>
      {options.map((option, optionIndex) => (
        <option key={optionIndex} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
    <WorkoutFormError name={fieldName} />
  </div>
);
