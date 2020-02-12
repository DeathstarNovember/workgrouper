import React from "react";
import { Field } from "formik";
import { SelectOption } from "../../types";

const selectStyle =
  "block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-2 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline my-2";
const fieldStyle =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-2";
const labelStyle = "block text-gray-700 text-sm font-bold";

type LabelProps = {
  label: string;
};

export const Label: React.FC<LabelProps> = ({ label }) => (
  <div className={labelStyle}>{label}</div>
);

type InputProps = {
  labelText: string;
  fieldName: string;
  placeholder?: string;
};

export const Input: React.FC<InputProps> = ({
  labelText,
  fieldName,
  ...props
}) => (
  <div>
    <Label label={labelText} />
    <Field className={fieldStyle} name={fieldName} {...props} />
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
  </div>
);
