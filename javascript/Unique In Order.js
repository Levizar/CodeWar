// Split make the function crash if iterable is already an array
const uniqueInOrder = iterable => iterable.split("").reduce((acc, item) => item === acc[acc.length - 1] ? acc : [...acc, item], []);

// add a condition for the split
const uniqueInOrder = iterable => (Array.isArray(iterable) ? iterable : iterable.split("")).reduce((acc, item) => item === acc[acc.length - 1] ? acc : [...acc, item], []);