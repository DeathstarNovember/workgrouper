import React from "react";
import {
  SingleRoundSingleModeWorkgroupLabel,
  MultipleRoundsSingleModeWorkgroupLabel,
  MultipleRoundsMultiModeWorkgroupLabel
} from ".";
import { areTheseThingsEqual, getOrdinalSymbol } from "../../utils";
import { Workgroup } from "../../types";

type RxWorkgroupLabelProps = {
  workgroup: Workgroup;
  workoutIndex: number;
  workgroupIndex: number;
};

export const RxWorkgroupLabel: React.FC<RxWorkgroupLabelProps> = ({
  workgroup,
  workoutIndex,
  workgroupIndex
}) => {
  const { rounds, note } = workgroup;
  const firstRound = rounds[0];
  const roundsCount = rounds.length;
  const roundsAreEqual = areTheseThingsEqual(rounds);
  const ordinalSymbol = getOrdinalSymbol(workgroupIndex);
  if (!firstRound.worksets[0].exercise.name)
    return <div className="text-gray-900 font-bold">Click to configure</div>;
  return (
    <div className="m-1">
      {note ? <div className="text-sm mt-1">{note}</div> : null}
      <div className="flex">
        <div className="mr-1">{ordinalSymbol}</div>
        {roundsCount === 1 ? (
          firstRound.worksets[0].exerciseName === "" ? (
            <div key={`workout${workoutIndex}workgroup${workgroupIndex}`} />
          ) : (
            <SingleRoundSingleModeWorkgroupLabel
              key={`workout${workoutIndex}workgroup${workgroupIndex}`}
              round={rounds[0]}
            />
          )
        ) : roundsAreEqual ? (
          <MultipleRoundsSingleModeWorkgroupLabel
            key={`workout${workoutIndex}workgroup${workgroupIndex}`}
            workgroup={workgroup}
          />
        ) : (
          <MultipleRoundsMultiModeWorkgroupLabel
            key={`workout${workoutIndex}workgroup${workgroupIndex}`}
            workgroup={workgroup}
            workgroupIndex={workgroupIndex}
            workoutIndex={workoutIndex}
          />
        )}
      </div>
    </div>
  );
};
