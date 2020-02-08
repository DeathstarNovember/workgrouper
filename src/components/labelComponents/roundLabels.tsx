import React from "react";
import {
  SingleWorksetLabelWithExercise,
  MultipleWorksetsWithoutExerciseLabel,
  MultipleWorksetsWithExerciseLabel
} from ".";
import { areTheseThingsEqual, getIntervalSymbol } from "../../utils";
import { Workset, Round, Workgroup } from "../../types";

export const groupWorksets = (worksets: Workset[]) => {
  let groupedWorksets: Workset[][] = [];
  worksets.forEach((thisWorkset, i, arr) => {
    const prevWorkset = arr[i - 1];
    if (i === 0) {
      groupedWorksets.push([thisWorkset]);
    } else if (areTheseThingsEqual([thisWorkset, prevWorkset])) {
      groupedWorksets[groupedWorksets.length - 1].push(thisWorkset);
    } else {
      groupedWorksets.push([thisWorkset]);
    }
  });
  return groupedWorksets;
};

type SRSMWLabelProps = {
  round: Round;
};

export const SingleRoundSingleModeWorkgroupLabel: React.FC<SRSMWLabelProps> = ({
  round
}) => {
  const worksets = round.worksets;
  const worksetsAreEqual = areTheseThingsEqual(worksets);
  if (worksetsAreEqual) {
    return <MultipleWorksetsWithExerciseLabel worksets={worksets} />;
  } else {
    const exerciseName = worksets[0].exercise.name;
    const groupedWorksets = groupWorksets(worksets);
    return (
      <div>
        {exerciseName + ", "}
        {groupedWorksets.map((worksetGroup, worksetGroupIndex) => {
          return (
            <MultipleWorksetsWithoutExerciseLabel
              key={`worksetGroup${worksetGroupIndex}`}
              worksets={worksetGroup}
            />
          );
        })}
      </div>
    );
  }
};

type MRMMWLabelProps = { workgroup: Workgroup };

export const MultipleRoundsSingleModeWorkgroupLabel: React.FC<MRMMWLabelProps> = ({
  workgroup
}) => {
  const { rounds } = workgroup;
  const roundCount = rounds.length;
  const round = rounds[0];
  const worksets = round.worksets;
  const { exercise } = worksets[0];
  const groupedWorksets = groupWorksets(worksets);
  const isMultiModal =
    worksets.map(ws => ws.exercise.name).filter((v, i, a) => a.indexOf(v) === i)
      .length !== 1;

  return (
    <div>
      {!isMultiModal ? exercise.name + ", " : null}
      {roundCount + " rounds"}
      {groupedWorksets.map((worksetGroup, worksetGroupIndex) =>
        isMultiModal ? (
          <MultipleWorksetsWithExerciseLabel
            key={`${worksetGroupIndex}`}
            worksets={worksetGroup}
          />
        ) : (
          <MultipleWorksetsWithoutExerciseLabel
            key={`${worksetGroupIndex}`}
            worksets={worksetGroup}
          />
        )
      )}
    </div>
  );
};

type MRMMWorkgroupLabelProps = {
  workgroup: Workgroup;
  workgroupIndex: number;
  workoutIndex: number;
};

export const MultipleRoundsMultiModeWorkgroupLabel: React.FC<MRMMWorkgroupLabelProps> = ({
  workgroup,
  workgroupIndex,
  workoutIndex
}) => {
  const { rounds } = workgroup;
  return (
    <div>
      {rounds.map((round, roundIndex) => {
        const groupedWorksets = groupWorksets(round.worksets);
        const intervalSymbol = getIntervalSymbol(
          round.interval,
          round.intervalType
        );
        return (
          <div
            key={`wo${workoutIndex}wg${workgroupIndex}mmr${roundIndex}label`}
          >
            {`Round ${roundIndex + 1}`}
            {intervalSymbol}
            {groupedWorksets.map((worksetGroup, worksetGroupIndex) =>
              worksetGroup.length === 1 ? (
                <div
                  className="ml-2"
                  key={`wo${workoutIndex}wg${workgroupIndex}mmr${roundIndex}wsg${worksetGroupIndex}swle`}
                >
                  <SingleWorksetLabelWithExercise workset={worksetGroup[0]} />
                </div>
              ) : (
                <div
                  className="ml-2"
                  key={`wo${workoutIndex}wg${workgroupIndex}mmr${roundIndex}wsg${worksetGroupIndex}mwle`}
                >
                  <MultipleWorksetsWithExerciseLabel worksets={worksetGroup} />
                </div>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};
