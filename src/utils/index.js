export * from "./workoutUtils";

export const groupObjectsByProperty = (objectArray, property) => {
  return objectArray.reduce(function(acc, obj) {
    let key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

export const camelCaseToTitle = camelCaseString =>
  camelCaseString
    .replace(/([A-Z])/g, match => ` ${match}`)
    .replace(/^./, match => match.toUpperCase());

export const toCamelCase = string =>
  string
    .toLowerCase()
    .trim()
    .split(/[.\-_\s]/g)
    .reduce((string, word) => string + word[0].toUpperCase() + word.slice(1));
