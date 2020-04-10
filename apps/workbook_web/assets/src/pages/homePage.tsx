import React, { useContext } from "react";
import { LayoutContext } from "..";
import { FlexBox } from "../workbook_ui";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const layout = useContext(LayoutContext);
  return (
    <FlexBox
      className="flex-1 items-center justify-center"
      style={{ minHeight: `calc(100vh - ${layout.header.height}px)` }}
    >
      <div className="text-6xl text-gray-900 ">Home</div>
    </FlexBox>
  );
};
