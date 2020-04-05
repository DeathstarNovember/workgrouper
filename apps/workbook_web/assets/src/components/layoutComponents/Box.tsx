import React, { FC } from "react";
export type BoxProps = React.HTMLAttributes<HTMLDivElement>;
export const Box: FC<BoxProps> = props => {
  return <div {...props} />;
};
export const FlexBox: FC<BoxProps> = ({ className, ...props }) => {
  return <Box className={`flex ${className}`} {...props} />;
};
export const FlexRow: FC<BoxProps> = ({ className, ...props }) => {
  return <Box className={`flex ${className}`} {...props} />;
};
export const FlexRow1: FC<BoxProps> = ({ className, ...props }) => {
  return <Box className={`flex flex-1 ${className}`} {...props} />;
};
export const FlexRow2: FC<BoxProps> = ({ className, ...props }) => {
  return <Box className={`flex flex-2 ${className}`} {...props} />;
};
export const FlexRow3: FC<BoxProps> = ({ className, ...props }) => {
  return <Box className={`flex flex-3 ${className}`} {...props} />;
};
export const FlexCol: FC<BoxProps> = ({ className, ...props }) => {
  return <Box className={`flex-col ${className}`} {...props} />;
};
export const FlexCol1: FC<BoxProps> = ({ className, ...props }) => {
  return <Box className={`flex-col flex-1 ${className}`} {...props} />;
};
export const FlexCol2: FC<BoxProps> = ({ className, ...props }) => {
  return <Box className={`flex-col flex-2 ${className}`} {...props} />;
};
export const FlexCol3: FC<BoxProps> = ({ className, ...props }) => {
  return <Box className={`flex-col flex-3 ${className}`} {...props} />;
};
