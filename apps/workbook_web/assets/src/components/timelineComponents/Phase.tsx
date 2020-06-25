import React from "react";
import { Phase } from "../../types";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { FaWeight } from "react-icons/fa";
import Collapsible from "react-collapsible";
import { FlexBox } from "../../workbook_ui";
import { CycleTimelineEntry } from ".";
import { TimelineBottomBar } from "..";

type PhaseTimelineEntryProps = {
  phase: Phase;
  phasePrefix: string;
};

export const PhaseTimelineEntry: React.FC<PhaseTimelineEntryProps> = ({
  phase,
  phasePrefix,
}) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#0455cc",
        boxShadow: "none",
      }}
      contentArrowStyle={{
        borderRight: `7px solid ${"#0455cc"}`,
      }}
      iconStyle={{
        background: "#0455cc",
        color: "#5540d5",
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
