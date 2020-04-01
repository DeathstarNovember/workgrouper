import React from "react";
import { Field, ErrorMessage, FieldProps } from "formik";
import { SelectOption } from "../../types";
import { labelStyle, fieldStyle, selectStyle } from ".";
import { errorFieldStyle } from "./formStyles";

type WorkoutFormErrorProps = {
  name: string;
};

export const WorkoutFormError: React.FC<WorkoutFormErrorProps> = ({ name }) => {
  return <ErrorMessage name={name} />;
};

type LabelProps = {
  label: string;
  labelClassName?: string;
};

export const Label: React.FC<LabelProps> = ({ label, labelClassName }) => (
  <div className={labelStyle + " " + labelClassName}>{label}</div>
);

type InputProps = {
  labelText?: string;
  fieldName: string;
  placeholder?: string;
  labelClassName?: string;
  fieldClassName?: string;
  password?: boolean;
};

export const Input: React.FC<InputProps> = ({
  labelClassName,
  fieldClassName,
  labelText,
  fieldName,
  password,
  ...props
}) => (
  <div>
    {labelText ? (
      <Label label={labelText} labelClassName={labelClassName} />
    ) : null}
    <Field name={fieldName}>
      {({ field, meta }: FieldProps) => {
        const style = fieldStyle + " " + fieldClassName;
        const errorStyle = style + " " + errorFieldStyle;
        return (
          <div>
            <input
              type={password ? "password" : "text"}
              className={meta.touched && meta.error ? errorStyle : style}
              placeholder={props.placeholder}
              {...field}
            />
            {/* {meta.touched && meta.error ? (
              <div className="text">{meta.error}</div>
            ) : null} */}
          </div>
        );
      }}
    </Field>
  </div>
);

type SelectProps = {
  options: SelectOption[];
  fieldName: string;
  fieldClassName?: string;
  labelText: string;
  labelClassName?: string;
  defaultValue?: string | number;
};
export const Select: React.FC<SelectProps> = ({
  options,
  fieldName,
  fieldClassName,
  labelText,
  labelClassName,
  defaultValue
}) => (
  <div>
    {labelText ? (
      <Label label={labelText} labelClassName={labelClassName || "mb-2"} />
    ) : null}
    <Field
      as="select"
      className={selectStyle + " " + fieldClassName}
      name={fieldName}
      defaultValue={defaultValue}
    >
      {options.map((option, optionIndex) => (
        <option key={optionIndex} value={option.value}>
          {option.label}
        </option>
      ))}
    </Field>
    <WorkoutFormError name={fieldName} />
  </div>
);
