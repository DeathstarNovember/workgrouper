import React, { useState } from "react";

import "react-vertical-timeline-component/style.min.css";
import { Program, Phase, Cycle, TrainingSession, Workout } from "../types";
import { Box, RemoveButton, Button } from "../workbook_ui";
import { useMutation } from "@apollo/react-hooks";
import { deleteProgramMutation } from "../graphql";
import { WorkoutLabel } from "./labelComponents";
import { WorkoutOverview } from "./WorkoutOverview";

type TimelineBottomBarProps = {};

export const TimelineBottomBar: React.FC<TimelineBottomBarProps> = ({}) => {
  return (
    <Box
      className="rounded border-white border-2 flex flex-1"
      style={{ marginTop: -4 }}
    />
  );
};

type ProgramPaneProps = {
  program: Program;
  programIndex?: number;
  clearSelectedProgram: () => void;
};

type ProgramBoxProps = {
  layoutOrientation: LayoutOrientation;
};
type PhaseBoxProps = ProgramBoxProps & {
  phase: Phase;
};

const PhaseBox: React.FC<PhaseBoxProps> = ({
  layoutOrientation,
  children,
  phase,
  ...props
}) => {
  return (
    <Box className="">
      <Box className="text-lg font-bold text-gray-200">
        Phase {phase.sortOrder + 1}
      </Box>
      <Box
        className={`${
          layoutOrientation === "vertical" ? "flex-col" : "flex"
        } p-5 m-3 w-full bg-gray-500 rounded`}
      >
        {children}
      </Box>
    </Box>
  );
};

type CycleBoxProps = ProgramBoxProps & { cycle: Cycle };

const CycleBox: React.FC<CycleBoxProps> = ({
  layoutOrientation,
  cycle,
  children,
  ...props
}) => {
  return (
    <Box className="m-2">
      <Box className="text-lg font-bold color-gray-200">
        Cycle {cycle.sortOrder + 1}
      </Box>
      <Box
        className={`${
          layoutOrientation === "vertical" ? "flex justify-around" : "flex"
        } flex-1 p-5 m-3 w-full bg-gray-600 rounded text-gray-200`}
      >
        {children}
      </Box>
    </Box>
  );
};

type TrainingSessionBoxProps = ProgramBoxProps & {
  trainingSession: TrainingSession;
  toggleSelectWorkout: (arg0: Workout, arg1: number) => void;
  selected: boolean;
};

const TrainingSessionBox: React.FC<TrainingSessionBoxProps> = ({
  children,
  trainingSession,
  layoutOrientation,
  toggleSelectWorkout,
  selected,
  ...props
}) => {
  return (
    <Box
      onClick={() =>
        toggleSelectWorkout(trainingSession.workout, trainingSession.id)
      }
      className={`flex-1 flex-col rounded m-2 ${selected ? "bg-white" : ""}`}
    >
      {/* <Box className="text-lg font-bold color-gray-200">
        Session {trainingSession.sortOrder + 1}
      </Box> */}
      <Box className="bg-gray-800 rounded text-gray-200 p-2 m-2">
        {children}
      </Box>
    </Box>
  );
};
type LayoutOrientation = "horizontal" | "vertical";

export const ProgramPane: React.FC<ProgramPaneProps> = ({
  program,
  programIndex,
  clearSelectedProgram,
}) => {
  const [selectedWorkoutIndexes, setSelectedWorkoutIndexes] = useState<
    number[]
  >([]);
  const selectWorkout = (workout: Workout, workoutIndex: number) => {
    // setSelectedWorkout(workout);
    setSelectedWorkoutIndexes([...selectedWorkoutIndexes, workoutIndex]);
  };
  const clearSelectedWorkout = (workoutIndex: number) => {
    // setSelectedWorkout(undefined);
    setSelectedWorkoutIndexes(
      selectedWorkoutIndexes.filter((index) => index !== workoutIndex)
    );
  };
  const toggleSelectWorkout = (workout: Workout, workoutIndex: number) => {
    if (selectedWorkoutIndexes.includes(workoutIndex)) {
      clearSelectedWorkout(workoutIndex);
    } else {
      selectWorkout(workout, workoutIndex);
    }
  };
  const [layoutOrientation, setLayoutOrientation] = useState<LayoutOrientation>(
    "horizontal"
  );
  const toggleOrientation = () => {
    switch (layoutOrientation) {
      case "horizontal":
        setLayoutOrientation("vertical");
        break;
      case "vertical":
        setLayoutOrientation("horizontal");
        break;
    }
  };
  const { name, description, id } = program;
  const [deleteProgram] = useMutation(deleteProgramMutation, {
    variables: { id },
    onCompleted: clearSelectedProgram,
  });
  return (
    <div className="w-full">
      {programIndex !== undefined ? (
        <Box className="p-5">
          <RemoveButton remove={deleteProgram} index={id} />
          <Button onClick={toggleOrientation}>O</Button>
          <Box className="text-3xl text-gray-100 font-bold">{name}</Box>
          <Box className="text-lg text-gray-300">{description}</Box>
          <Box className="w-full">
            {program.phases
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map((phase, phaseIndex) => {
                const phaseKey = `program${programIndex}phase${phaseIndex}`;
                return (
                  <PhaseBox
                    key={phaseKey}
                    phase={phase}
                    layoutOrientation={layoutOrientation}
                  >
                    {phase.cycles
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((cycle, cycleIndex) => {
                        const cycleKey = `${phaseKey}cycle${cycleIndex}`;
                        return (
                          <CycleBox
                            key={cycleKey}
                            cycle={cycle}
                            layoutOrientation={layoutOrientation}
                          >
                            {cycle.trainingSessions
                              .sort((a, b) => a.sortOrder - b.sortOrder)
                              .map((trainingSession, trainingSessionIndex) => {
                                const trainingSessionKey = `${cycleKey}trainingSession${trainingSessionIndex}`;
                                return (
                                  <TrainingSessionBox
                                    key={trainingSessionKey}
                                    trainingSession={trainingSession}
                                    layoutOrientation={layoutOrientation}
                                    toggleSelectWorkout={toggleSelectWorkout}
                                    selected={selectedWorkoutIndexes.includes(
                                      trainingSession.id
                                    )}
                                  >
                                    {trainingSession.workout.name}
                                    <WorkoutOverview
                                      workout={trainingSession.workout}
                                      workoutIndex={trainingSessionIndex}
                                    />
                                  </TrainingSessionBox>
                                );
                              })}
                          </CycleBox>
                        );
                      })}
                  </PhaseBox>
                );
              })}
          </Box>
        </Box>
      ) : null}
    </div>
  );
};
{
  /* <ProgramLabel program={program} programIndex={programIndex} /> */
}
{
  /* <VerticalTimeline layout="1-column">
            <VerticalTimelineElement
              contentStyle={{ color: "#fff" }}
              iconStyle={{
                background: "rgb(16, 204, 82)",
                color: "#fff",
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
          <TimelineBottomBar /> */
}
