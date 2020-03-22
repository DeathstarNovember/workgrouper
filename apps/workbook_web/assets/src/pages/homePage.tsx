import React, { useContext } from "react";
import { LayoutContext } from "..";

interface HomePageProps {}

export const HomePage: React.FC<HomePageProps> = ({}) => {
  const layout = useContext(LayoutContext);
  return (
    <div
      className="flex flex-1 items-center justify-center"
      style={{ minHeight: `calc(100vh - ${layout.header.height}px)` }}
    >
      <div className="text-6xl text-gray-900 ">Home</div>
    </div>
  );
};
