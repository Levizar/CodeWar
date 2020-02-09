// Thx to https://math.stackexchange.com/questions/2675382/calculating-integer-partitions
const pentagonalNumber = k => (k * (3 * k - 1)) / 2;
const sum = num => {
    const partitions = [1];
    for (let i = 1; i < num + 1; i++) {
        partitions.push(0);
        for (let j = 1; j <= i + 1; j++) {
            const coef = (-1) ** (j + 1);
            for (let k of [pentagonalNumber(j), pentagonalNumber(-j)]) {
                if (i - k >= 0) partitions[i] += coef * partitions[i - k];
            }
        }
    }
    return partitions[partitions.length - 1];
};
