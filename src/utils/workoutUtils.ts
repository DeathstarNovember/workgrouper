import { ordinals } from "../data";
import { diff } from "deep-object-diff";
import { IntervalType, IntensityUnit } from "../types";
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
export const getIntensitySymbol = (intensityUnit: IntensityUnit) => {
  switch (Number(intensityUnit)) {
    case IntensityUnit.pounds:
      return `lbs`;
    case IntensityUnit.meters:
      return `m`;
    case IntensityUnit.seconds:
      return "seconds";
    default:
      return `${intensityUnit}`;
  }
};

export const getOrdinalSymbol = (sortOrder: number) => {
  return ordinals[sortOrder] + ".";
};

export const areTheseThingsEqual = (things: any[]) => {
  const unorderedThings = things.map(thing => ({ ...thing, sortOrder: 0 }));
  const thingDiffs = unorderedThings.map((thing, i, arr) =>
    diff(arr[0], thing)
  );
  const areThingsEqual = thingDiffs.every(
    thingDiff =>
      Object.keys(thingDiff).length === 0 && thingDiff.constructor === Object
  );
  return areThingsEqual;
};
