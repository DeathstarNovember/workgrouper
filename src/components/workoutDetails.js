import React from "react";
import { RxWorkgroupLabel } from ".";

export const WorkoutDetails = ({ workout, workoutIndex }) => {
  return (
    <div className="m-3 p-3 bg-gray-300 rounded w-2/3">
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
