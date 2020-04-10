import React, { useContext } from "react";
import { Cycle } from "../../types";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import { FaWeightHanging } from "react-icons/fa";
import Collapsible from "react-collapsible";
import { TrainingSessionTimelineEntry } from ".";
import { ColorsContext, TimelineBottomBar } from "../ProgramPane";
type CycleTimelineEntryProps = {
  cycle: Cycle;
  cyclePrefix: string;
};
export const CycleTimelineEntry: React.FC<CycleTimelineEntryProps> = ({
  cycle,
  cyclePrefix
}) => {
  const sectionColors = useContext(ColorsContext);
  return (
    <VerticalTimeline layout="1-column">
      <VerticalTimelineElement
        className="vertical-timeline-element"
        contentStyle={{
          background: sectionColors.cycle.contentBackground
        }}
        contentArrowStyle={{
          borderRight: `7px solid ${sectionColors.cycle.contentBackground}`
        }}
        iconStyle={{
          background: sectionColors.cycle.contentBackground,
          color: sectionColors.cycle.iconColor
        }}
        icon={<FaWeightHanging />}
      >
        <Collapsible
          trigger={
            <div
              className={`rounded p-1 px-4 text-2xl font-bold border-white border-4`}
            >
              {cycle.name}
            </div>
          }
        >
          <VerticalTimeline layout="1-column">
            {cycle.trainingSessions
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((trainingSession, trainingSessionIndex) => {
                return (
                  <TrainingSessionTimelineEntry
                    key={`${cyclePrefix}trainingSession${trainingSessionIndex}`}
                    trainingSession={trainingSession}
                    trainingSessionIndex={trainingSessionIndex}
                  />
                );
              })}
          </VerticalTimeline>
        </Collapsible>
        <TimelineBottomBar />
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
};
