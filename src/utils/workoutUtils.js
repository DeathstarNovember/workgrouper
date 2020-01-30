import { ordinals } from "../data";
import { diff } from "deep-object-diff";
export const getIntervalSymbol = (interval, intervalType) => {
  switch (intervalType) {
    case "inclusive":
      return ` //${interval}`;
    case "exclusive":
      return ` /${interval}`;
    case "none":
      return "";
    default:
      return `${interval}`;
  }
};

export const getOrdinalSymbol = sortOrder => {
  return ordinals[sortOrder] + ".";
};

export const areTheseThingsEqual = things => {
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
