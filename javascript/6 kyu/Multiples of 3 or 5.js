const solution = number => (number < 0 ? 0 : [...Array(number).keys()].reduce((acc, elm) => acc + (elm % 3 === 0 || elm % 5 === 0 ? elm : 0), 0));
