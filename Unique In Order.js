const uniqueInOrder = iterable => {
    iterable.split("").reduce((acc, item) => {
        item === acc[acc.length - 1] ? acc : [...acc, item];
    }, []);
};

for (let index = 0; index < array.length; index++) {
    const element = array[index];
}
