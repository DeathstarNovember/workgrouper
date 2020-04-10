import React, { useContext } from "react";
import { Phase } from "../../types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { FaWeight } from "react-icons/fa";
import Collapsible from "react-collapsible";
import { FlexBox } from "../layoutComponents";
import { CycleTimelineEntry } from ".";
import { TimelineBottomBar } from "..";
import { ColorsContext } from "../ProgramPane";

type PhaseTimelineEntryProps = {
  phase: Phase;
  phasePrefix: string;
};

export const PhaseTimelineEntry: React.FC<PhaseTimelineEntryProps> = ({
  phase,
  phasePrefix
}) => {
  const sectionColors = useContext(ColorsContext);
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: sectionColors.phase.contentBackground,
        boxShadow: "none"
      }}
      contentArrowStyle={{
        borderRight: `7px solid ${sectionColors.phase.contentBackground}`
      }}
      iconStyle={{
        background: sectionColors.phase.contentBackground,
        color: sectionColors.phase.iconColor
      }}
      icon={<FaWeight />}
    >
      <Collapsible
        trigger={
          <div
            className={`rounded p-1 px-4 text-2xl font-bold border-white border-4`}
          >
            {phase.name}
          </div>
        }
      >
        <FlexBox className="pl-1">
          {phase.cycles
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((cycle, cycleIndex) => {
              const cyclePrefix = `${phasePrefix}cycle${cycleIndex}`;
              return (
                <CycleTimelineEntry
                  key={cyclePrefix}
                  cycle={cycle}
                  cyclePrefix={cyclePrefix}
                />
              );
            })}
        </FlexBox>
      </Collapsible>
      <TimelineBottomBar />
    </VerticalTimelineElement>
  );
};
