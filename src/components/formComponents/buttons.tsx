import React from "react";
import { FaPlus, FaTimes } from "react-icons/fa";

type SubmitButtonProps = {
  isSubmitting: boolean;
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  text?: string;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  hoverColor,
  bgColor,
  textColor,
  text
}) => (
  <button
    type="submit"
    disabled={isSubmitting}
    className={`bg-${bgColor ? bgColor : "blue"}-300 hover:bg-${
      hoverColor ? hoverColor : bgColor || "blue"
    }-400 text-${
      textColor ? textColor : "gray"
    }-800 py-1 px-2 rounded inline-flex items-center`}
  >
    {text ? text : "Submit"}
  </button>
);

type AddButtonProps = {
  add: () => void;
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  text?: string;
};

export const AddButton: React.FC<AddButtonProps> = ({
  add,
  hoverColor,
  bgColor,
  textColor,
  text
}) => (
  <button
    className={`bg-${bgColor ? bgColor : "blue"}-300 hover:bg-${
      hoverColor ? hoverColor : bgColor || "blue"
    }-400 text-${
      textColor ? textColor : "gray"
    }-800 py-1 px-2 rounded inline-flex items-center`}
    type="button"
    onClick={add}
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

export const RemoveButton: React.FC<RemoveButtonProps> = ({
  remove,
  hoverColor,
  bgColor,
  textColor,
  index,
  text
}) => (
  <button
    className={`bg-${bgColor ? bgColor : "blue"}-300 hover:bg-${
      hoverColor ? hoverColor : bgColor || "blue"
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
