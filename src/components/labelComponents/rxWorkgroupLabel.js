import React from "react";
import {
  SingleRoundSingleModeWorkgroupLabel,
  MultipleRoundsSingleModeWorkgroupLabel,
  MultipleRoundsMultiModeWorkgroupLabel
} from ".";
import { areTheseThingsEqual, getOrdinalSymbol } from "../../utils";

export const RxWorkgroupLabel = ({
  workgroup,
  workoutIndex,
  workgroupIndex
}) => {
  const { rounds, note } = workgroup;
  const roundsCount = rounds.length;
  const roundsAreEqual = areTheseThingsEqual(rounds);
  const ordinalSymbol = getOrdinalSymbol(workgroup.sortOrder);
  return (
    <div className="mb-2">
      {note ? <div className="text-sm mt-1">{note}</div> : null}
      <div className="flex">
        <div className="mr-1">{ordinalSymbol}</div>
        {roundsCount === 1 ? (
          <SingleRoundSingleModeWorkgroupLabel
            key={`workout${workoutIndex}workgroup${workgroupIndex}`}
            round={rounds[0]}
          />
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
