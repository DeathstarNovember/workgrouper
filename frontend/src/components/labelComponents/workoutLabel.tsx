import React from "react";
import { RxWorkgroupLabel } from ".";
import { Workout } from "../../types";

type WorkoutLabelProps = {
  workout: Workout;
  workoutIndex: number;
};

export const WorkoutLabel: React.FC<WorkoutLabelProps> = ({
  workout,
  workoutIndex
}) => (
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
