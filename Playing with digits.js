const digPow = (n, p) => {
    let num = n
        .toString()
        .split("")
        .reduce((acc, elm, i) => acc + Math.pow(elm, p + i), 0);
    return num % n === 0 ? num / n : -1;
};
