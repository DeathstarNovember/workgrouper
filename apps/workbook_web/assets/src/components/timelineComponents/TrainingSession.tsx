import React, { useContext } from "react";
import { TrainingSession } from "../../types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import Collapsible from "react-collapsible";
import { WorkoutLabel } from "../labelComponents";
import { FaCalendar } from "react-icons/fa";
import { ColorsContext } from "../ProgramPane";

type TrainingSessionTimelineEntryProps = {
  trainingSession: TrainingSession;
  trainingSessionIndex: number;
};

export const TrainingSessionTimelineEntry: React.FC<TrainingSessionTimelineEntryProps> = ({
  trainingSession,
  trainingSessionIndex
}) => {
  const sectionColors = useContext(ColorsContext);
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element"
      contentStyle={{
        background: sectionColors.trainingSession.contentBackground
      }}
      contentArrowStyle={{
        borderRight: `7px solid  ${sectionColors.trainingSession.contentBackground}`
      }}
      iconStyle={{
        background: sectionColors.trainingSession.contentBackground,
        color: sectionColors.trainingSession.iconColor
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
