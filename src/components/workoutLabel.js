import React from "react";
import { RxWorkgroupLabel } from ".";

export const WorkoutLabel = ({ workout, workoutIndex }) => (
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
);
