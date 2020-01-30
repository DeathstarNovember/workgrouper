import React from "react";
import { RxWorkgroupLabel } from ".";

export const Workgroup = ({ workgroup, workoutIndex, workgroupIndex }) => {
  return (
    <div className="bg-gray-200 p-3 my-1 flex-col rounded">
      <div className="flex ">
        <RxWorkgroupLabel
          workoutIndex={workoutIndex}
          workgroupIndex={workgroupIndex}
          workgroup={workgroup}
        />
      </div>
    </div>
  );
};
