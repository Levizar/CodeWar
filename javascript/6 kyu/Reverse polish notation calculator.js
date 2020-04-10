const calc = (str) => {
    const stack = [];
    const arr = str.split(' ');
    arr.forEach((elm) => {
        let result;
        if (elm === 'sqrt') {
            const nb1 = stack.pop();
            result = Math.sqrt(nb1);
        } else if (isNaN(+elm)) {
            const nb2 = stack.pop();
            const nb1 = stack.pop();
            result = eval(`${nb1} ${elm} ${nb2}`);
        } else {
            result = elm;
        }
        stack.push(result);
    });
    return +stack[0];
};
