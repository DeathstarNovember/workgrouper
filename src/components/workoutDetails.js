import React from "react";
import { RxWorkgroupLabel } from "./labelComponents";

export const WorkoutDetails = ({ workout, workoutIndex }) => {
  return (
    <div className="m-3 p-3 bg-gray-300 rounded">
      <div>
        {workout.workgroups.map((workgroup, workgroupIndex) => (
          <RxWorkgroupLabel
            key={"workgroupLabel" + workgroupIndex}
            workgroup={workgroup}
            workgroupIndex={workgroupIndex}
            workoutIndex={workoutIndex}
          />
        ))}
      </div>
    </div>
  );
};
