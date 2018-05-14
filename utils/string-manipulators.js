import * as R from 'ramda';


export const getArrayFromSplit = (string, splitAt) => R.split(splitAt, string);
export const toCamelCase = (str) => str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());