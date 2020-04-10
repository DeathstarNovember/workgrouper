import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Program } from "../types";
import { ButtonGroup } from "../workbook_ui";
import { useMutation } from "@apollo/react-hooks";
import { deleteProgramMutation } from "../graphql";
import { FaStar } from "react-icons/fa";

import { PhaseTimelineEntry } from "./timelineComponents";

type TimelineBottomBarProps = {};

export const TimelineBottomBar: React.FC<TimelineBottomBarProps> = ({}) => {
  return (
    <Box
      className="rounded border-white border-2 flex flex-1"
      style={{ marginTop: -4 }}
    />
  );
};

type ProgramLabelProps = {
  program: Program;
};

const ProgramLabel: React.FC<ProgramLabelProps> = ({ program }) => {
  return <div className="text-2xl font-bold">{program.name}</div>;
};

type DeleteProgramButtonProps = {
  deleteProgram: () => void;
  className?: string;
};
const DeleteProgramButton: React.FC<DeleteProgramButtonProps> = ({
  deleteProgram,
  className
}) => (
  <button
    onClick={deleteProgram}
    className={`${className} bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1`}
  >
    Delete
  </button>
);

const sectionColors = {
  phase: {
    headingColor: "#777",
    contentBackground: "#717F95",
    iconColor: "#fff"
  },
  cycle: {
    headingColor: "#555",
    contentBackground: "#7D71DC",
    iconColor: "#fff"
  },
  trainingSession: {
    headingColor: "#333",
    contentBackground: "#F06D64",
    iconColor: "#fff"
  }
};

export const ColorsContext = React.createContext(sectionColors);

type ProgramPaneProps = {
  program: Program;
  programIndex?: number;
  clearSelectedProgram: () => void;
};

export const ProgramPane: React.FC<ProgramPaneProps> = ({
  program,
  programIndex,
  clearSelectedProgram
}) => {
  const { name, description, id } = program;
  const [deleteProgram] = useMutation(deleteProgramMutation, {
    variables: { id },
    onCompleted: clearSelectedProgram
  });
  return (
    <div className="rounded w-full">
      {programIndex !== undefined ? (
        <div>
          {/* <ProgramLabel program={program} programIndex={programIndex} /> */}
          <VerticalTimeline layout="1-column">
            <VerticalTimelineElement
              contentStyle={{ color: "#fff" }}
              iconStyle={{
                background: "rgb(16, 204, 82)",
                color: "#fff"
              }}
              icon={<FaStar />}
            >
              <div className={`rounded py-1 text-gray-900 text-3xl font-bold`}>
                {name}
              </div>
              <div className="text-gray-700 text-lg">{description}</div>
              <ButtonGroup>
                <DeleteProgramButton deleteProgram={deleteProgram} />
              </ButtonGroup>
            </VerticalTimelineElement>
            {program.phases
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((phase, phaseIndex) => {
                const phasePrefix = `program${programIndex}phase${phaseIndex}`;
                return (
                  <PhaseTimelineEntry phase={phase} phasePrefix={phasePrefix} />
                );
              })}
          </VerticalTimeline>
          <TimelineBottomBar />
        </div>
      ) : null}
    </div>
  );
};
