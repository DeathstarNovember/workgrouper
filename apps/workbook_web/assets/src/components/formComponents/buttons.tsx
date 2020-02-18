import React from "react";
import { FaPlus, FaTimes, FaArrowUp, FaArrowDown } from "react-icons/fa";

type FormButtonProps = {
  onClick?: (arg0: any | undefined) => any | void;
  isSubmitting?: boolean;
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  text?: string;
  type?: "button" | "submit";
};

export const FormButton: React.FC<FormButtonProps> = ({
  isSubmitting,
  hoverColor,
  bgColor,
  textColor,
  text,
  type = "button",
  onClick,
  children
}) => {
  const defaultColor = "blue";
  const submitColor = "green";
  const buttonBackgroundColor = bgColor
    ? bgColor
    : type === "submit"
    ? submitColor
    : defaultColor;
  const buttonHoverColor = hoverColor
    ? hoverColor
    : type === "submit"
    ? submitColor
    : defaultColor;
  const buttonTextColor = textColor ? textColor : "gray";
  const conditionalButtonProps: { [key: string]: any } = {};
  if (isSubmitting) {
    conditionalButtonProps["disabled"] = isSubmitting;
  }
  return (
    <button
      type={type}
      {...conditionalButtonProps}
      className={`flex align-center bg-${buttonBackgroundColor}-300 hover:bg-${buttonHoverColor}-400 text-${buttonTextColor}-800 py-1 px-2 m-1 rounded inline-flex items-center`}
      onClick={onClick}
    >
      {children}
      {text ? text : null}
    </button>
  );
};

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
}) => {
  const submitButtonProps = {
    hoverColor,
    bgColor,
    textColor,
    text
  };

  return (
    <FormButton
      type="submit"
      isSubmitting={isSubmitting}
      {...submitButtonProps}
    />
  );
};

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
  text = "add"
}) => {
  const customProps = {
    hoverColor,
    bgColor,
    textColor,
    text
  };
  return (
    <FormButton onClick={add} {...customProps}>
      <FaPlus className={`mr-2`} />
    </FormButton>
  );
};

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
  hoverColor = "red",
  bgColor = "red",
  textColor = "gray",
  index = 0,
  text = "remove"
}) => {
  const customProps = {
    hoverColor,
    bgColor,
    textColor,
    text
  };
  return (
    <FormButton onClick={() => remove(index)} {...customProps}>
      <FaTimes />
    </FormButton>
  );
};

type SwapButtonProps = {
  swap: (arg0: number, arg1: number) => void;
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  index: number;
  text?: string;
};

export const SwapUpButton: React.FC<SwapButtonProps> = ({
  swap,
  hoverColor = "gray",
  bgColor = "gray",
  textColor = "gray",
  index,
  text = ""
}) => {
  const customProps = {
    hoverColor,
    bgColor,
    textColor,
    text
  };
  return (
    <FormButton onClick={() => swap(index, index - 1)} {...customProps}>
      <FaArrowUp />
    </FormButton>
  );
};
export const SwapDownButton: React.FC<SwapButtonProps> = ({
  swap,
  hoverColor = "gray",
  bgColor = "gray",
  textColor = "gray",
  index,
  text = ""
}) => {
  const customProps = {
    hoverColor,
    bgColor,
    textColor,
    text
  };
  return (
    <FormButton onClick={() => swap(index, index + 1)} {...customProps}>
      <FaArrowDown />
    </FormButton>
  );
};
