const calc = (string) => {
    typeof string == "string" ? 0 : string = `${string}`;
    string = string.replace(/[ ]/gi, '');
    string = string.replace(/[-][-]/gi, '+');
    string = string.replace(/[)(\*+\/-]/gi, corresp => ` ${corresp} `);
    string = string.replace(/[ ][ ]/gi, ' ');
    string = string.trim();
    // Get the () group and use recursion on it until it finds the smallest group
    while (/[()]/g.test(string)) {
        string = string.replace(/[(][^()]*[)]/g, (corresp) => {
            string = string.replace(/[ ]/gi, '');
            string = string.replace(/[-][-]/gi, '+');
            string = string.replace(/[)(\*+\/-]/gi, corresp => ` ${corresp} `);
            corresp = corresp.split(' ');
            corresp.shift();
            corresp.pop();
            corresp = corresp.join(' ');
            return calc(corresp);
        })
    }

    function basicOperation(operationToPerform) {
        let initArr = string.split(' ');
        for (let i = 0; i < initArr.length; ++i) {
            if (operationToPerform.includes(initArr[i])) {
                if (i === 0 && initArr[i] === "-"){
                    initArr[i+1] = - initArr[i+1];
                    initArr.shift();
                    i=0;
                    continue;
                }
                const nbr1 = parseFloat(initArr[i - 1]);
                let nbr2;
                nbr2 = initArr[i + 1] === "-" ? -parseFloat(initArr[i + 2]) : parseFloat(initArr[i + 1]);
                let result;
                switch (initArr[i]) {
                    case "*":
                        result = +nbr1 * nbr2;
                        break;
                    case "/":
                        result = +nbr1 / nbr2;
                        break;
                    case "+":
                        if (isNaN(nbr1)) {
                            result = nbr2;
                            initArr.splice(i,1);
                            i = i - 1;
                            continue
                        } else if (isNaN(nbr2)) {
                            result = nbr1;
                        } else {
                            result = +nbr1 + nbr2;
                        }
                        break;
                    case "-":
                        if (isNaN(nbr1)) {
                            result = -nbr2;
                        } else if (isNaN(nbr2)) {
                            result = nbr1;
                        } else {
                            result = +nbr1 - nbr2;
                        }
                        break;
                    default:
                        console.log("default case operation : that shouldn't happen");
                        break;
                }
                initArr.length < 3 ? initArr.splice(i - 1, 2, result) : initArr.splice(i - 1, 3, result);
                i = i - 1;
            }
        }
        string = initArr.join(' ');
    };
    // Execute the operations
    [
        ["*", "/"],
        ["+", "-"]
    ].forEach(operation => basicOperation(operation));

    return parseFloat(string);
};

const test = (fun, input, expectedOutput) => {
    const output = fun(input);
    if (output === expectedOutput) {
        console.log("NOICE");
    } else {
        console.log("Not Noice");
        console.log(`output: ${output} , expected: ${expectedOutput}`);
    }
}

// test(calc,'1+1', 2); // ok
// test(calc,'-123', -123); // ok
// test(calc,'123', 123); // ok
// test(calc,'2 /2+3 * 4.75- -6', 21.25); // ok
// test(calc,'12* 123', 1476); // ok
// test(calc,'2 / (2 + 3) * 4.33 - -6', 7.732); // ok
// test(calc,'12*-1', -12); // OK
// test(calc, "12* 123/-(-5 + 2)", 492); // OK
// test(calc,"(1 - 2) + -(-(-(-4)))", 3); // ok
// test(calc,"(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11) ", 1); // ok
// test(calc,"12 * -123", -1476); // ok