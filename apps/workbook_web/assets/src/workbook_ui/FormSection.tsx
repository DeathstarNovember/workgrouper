import React from "react";
import { Box, BoxProps } from ".";

export enum SectionStyles {
  baseSection = "rounded p-2",
  roundSection = "bg-gray-300 mb-2",
  worksetSection = "bg-gray-200 mb-2",
  sectionTitle = "text-xl font-bold flex justify-between w-full",
  sectionTrigger = "border-solid border-2 border-gray-600 cursor-pointer bg-gray-100 hover:bg-gray-500 hover:text-gray-100 rounded p-1",
}

type FormSectionProps = BoxProps & {
  sectionStyle?: SectionStyles;
};

export const FormSection: React.FC<FormSectionProps> = ({
  sectionStyle,
  className,
  ...props
}) => {
  return (
    <Box
      className={`${SectionStyles.baseSection} ${sectionStyle} ${className}`}
      {...props}
    />
  );
};
