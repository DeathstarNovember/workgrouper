import React, { useContext } from "react";
import { TrainingSession } from "../../types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Collapsible from "react-collapsible";
import { WorkoutLabel } from "../labelComponents";
import { FaCalendar } from "react-icons/fa";

type TrainingSessionTimelineEntryProps = {
  trainingSession: TrainingSession;
  trainingSessionIndex: number;
};

export const TrainingSessionTimelineEntry: React.FC<TrainingSessionTimelineEntryProps> = ({
  trainingSession,
  trainingSessionIndex,
}) => {
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element"
      contentStyle={{
        background: "#550000",
      }}
      contentArrowStyle={{
        borderRight: `7px solid  ${"#550000"}`,
      }}
      iconStyle={{
        background: "#550000",
        color: "#555500",
      }}
      icon={<FaCalendar />}
    >
      <Collapsible
        trigger={
          <div className="p-1 px-4 text-2xl font-bold">
            {trainingSession.workout.name}
            {trainingSession.name}
            {trainingSession.description}
          </div>
        }
      >
        <WorkoutLabel
          workout={trainingSession.workout}
          workoutIndex={trainingSessionIndex}
        />
      </Collapsible>
    </VerticalTimelineElement>
  );
};
