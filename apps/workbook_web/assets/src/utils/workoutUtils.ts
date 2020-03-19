import { ordinals } from "../data";
import { diff } from "deep-object-diff";
import { IntervalType, IntensityUnit, IntensityType } from "../types";
export const getIntervalSymbol = (
  interval: number,
  intervalType: IntervalType
) => {
  switch (Number(intervalType)) {
    case IntervalType.inclusive:
      return ` //${interval}`;
    case IntervalType.exclusive:
      return ` /${interval}`;
    case IntervalType.none:
      return "";
    default:
      return `${interval}`;
  }
};
export const getIntensitySymbol = (
  intensityUnit: IntensityUnit,
  intensityType: IntensityType
) => {
  if (intensityType === IntensityType.relative) {
    return "%1rm";
  } else {
    switch (Number(intensityUnit)) {
      case IntensityUnit.weight:
        return "lbs";
      case IntensityUnit.speed:
        return "m/s";
      default:
        return `${intensityUnit}`;
    }
  }
};

export const getOrdinalSymbol = (sortOrder: number) => {
  return ordinals[sortOrder] + ".";
};

export const areTheseThingsEqual = (things: any[]) => {
  const unorderedThings = things.map(thing => ({
    ...thing,
    sortOrder: 0,
    id: 0
  }));
  const thingDiffs = unorderedThings.map((thing, i, arr) =>
    diff(arr[0], thing)
  );
  const areThingsEqual = thingDiffs.every(
    thingDiff =>
      Object.keys(thingDiff).length === 0 && thingDiff.constructor === Object
  );
  return areThingsEqual;
};
