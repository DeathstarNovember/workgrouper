import React from "react";
import { FaPlus, FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";
import { Box } from ".";

const baseButtonStyle =
  "flex font-bold align-center py-1 px-2 m-1 rounded inline-flex items-center text-gray-100";

export enum ButtonStyles {
  primary = "bg-blue-300 hover:bg-blue-400 ",
  secondary = "bg-purple-300 hover:bg-purple-400",
  success = "bg-green-300 hover:bg-green-400",
  warning = "bg-yellow-300 hover:bg-yellow-400",
  danger = "bg-red-300 hover:bg-red-400",
  info = "bg-gray-300 hover:bg-gray-400",
}

type ButtonProps = {
  onClick?: Function;
  hoverColor?: string;
  bgColor?: string;
  textColor?: string;
  buttonStyle?: ButtonStyles;
  text?: string;
  type?: "button" | "submit";
};

type ButtonGroupProps = {};
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);
  const childElements = childrenArray.filter((child) =>
    React.isValidElement(child)
  );
  const groupedChildren = childElements.map(
    (childElement, childElementIndex) => {
      if (React.isValidElement(childElement)) {
        return React.cloneElement(childElement, {
          className: `${childElement.props.className} ${
            childElements.length === 1
              ? "rounded"
              : childElementIndex === 0
              ? "rounded-l"
              : childElementIndex === childElements.length - 1
              ? "rounded-r"
              : ""
          }`,
        });
      } else {
        return childElement;
      }
    }
  );
  return (
    <Box className="flex" {...props}>
      {groupedChildren}
    </Box>
  );
};
export const Button: React.FC<ButtonProps> = ({
  buttonStyle,
  hoverColor,
  bgColor,
  textColor,
  text,
  type = "button",
  onClick,
  children,
}) => {
  const defaultStyle: ButtonStyles = buttonStyle || ButtonStyles.primary;
  const customStyle =
    bgColor && hoverColor && textColor
      ? `bg-${bgColor}-300 hover:bg-${hoverColor}-400 text-${textColor}-800`
      : undefined;

  return (
    <button
      type={type}
      className={`${baseButtonStyle} ${
        customStyle ? customStyle : defaultStyle
      }`}
      onClick={onClick}
    >
      {children}
      {text ? text : null}
    </button>
  );
};

export const SubmitButton: React.FC<ButtonProps> = ({
  hoverColor,
  bgColor,
  textColor,
  text,
}) => {
  const submitButtonProps = {
    hoverColor,
    bgColor,
    textColor,
    text,
  };

  return <Button type="submit" {...submitButtonProps} />;
};

type AddButtonProps = ButtonProps & {
  add: () => void;
};

export const AddButton: React.FC<AddButtonProps> = ({
  add,
  hoverColor,
  bgColor,
  textColor,
  text = "add",
}) => {
  const customProps = {
    hoverColor,
    bgColor,
    textColor,
    text,
  };
  return (
    <Button onClick={add} {...customProps}>
      <FaPlus className={`mr-2`} />
    </Button>
  );
};

type RemoveButtonProps = ButtonProps & {
  remove?: Function;
  index?: number;
};

export const RemoveButton: React.FC<RemoveButtonProps> = ({
  remove,
  buttonStyle = ButtonStyles.danger,
  index = 0,
  ...props
}) => {
  return (
    <Button buttonStyle={buttonStyle} onClick={remove} {...props}>
      <FaTrash />
    </Button>
  );
};

type SwapButtonProps = ButtonProps & {
  swap: (arg0: number, arg1: number) => void;
  index: number;
};

export const SwapUpButton: React.FC<SwapButtonProps> = ({
  swap,
  hoverColor = "gray",
  bgColor = "gray",
  textColor = "gray",
  index,
  text = "",
}) => {
  const customProps = {
    hoverColor,
    bgColor,
    textColor,
    text,
  };
  return (
    <Button onClick={() => swap(index, index - 1)} {...customProps}>
      <FaArrowUp />
    </Button>
  );
};
export const SwapDownButton: React.FC<SwapButtonProps> = ({
  swap,
  hoverColor = "gray",
  bgColor = "gray",
  textColor = "gray",
  index,
  text = "",
}) => {
  const customProps = {
    hoverColor,
    bgColor,
    textColor,
    text,
  };
  return (
    <Button onClick={() => swap(index, index + 1)} {...customProps}>
      <FaArrowDown />
    </Button>
  );
};
