const Calculator = function () {
    this.evaluate = string => {
        // Get the () group and use recursion on it until it finds the smallest group
        while (/[()]/g.test(string)) {
            string = string.replace(/[(][^()]*[)]/g, (corresp) => {
                corresp = corresp.split(' ');
                corresp.shift();
                corresp.pop();
                corresp = corresp.join(' ')
                return this.evaluate(corresp);
            })
        }

        function basicOperation(operationToPerform) {
            let initArr = string.split(' ');
            for (let i = 0; i < initArr.length; i++) {
                if (operationToPerform.includes(initArr[i])) {
                    const nbr1 = parseFloat(initArr[i - 1]);
                    const nbr2 = parseFloat(initArr[i + 1]);
                    let result;
                    switch (initArr[i]) {
                        case "**":
                            result = Math.pow(+nbr1, +nbr2);
                            break;
                        case "*":
                            result = +nbr1 * nbr2;
                            break;
                        case "/":
                            result = +nbr1 / nbr2;
                            break;
                        case "+":
                            result = +nbr1 + nbr2;
                            break;
                        case "-":
                            result = +nbr1 - nbr2;
                            break;
                        default:
                            console.log("default case operation : that shouldn't happen");
                            break;
                    }
                    initArr.splice(i - 1, 3, result);
                    i = i - 1;
                }
            }
            string = initArr.join(' ');
        };
        // Execute the operations
        [
            ["**"],
            ["*", "/"],
            ["+", "-"]
        ].forEach(operation => {
            basicOperation(operation)
            console.log(string);
        });
        return string;
    };
}
// test script:

function test(stringTest) {
    let calculate = new Calculator();
    let b = calculate.evaluate(stringTest);
    console.log("***********", stringTest, " = ", b);
}

// test("2 * 2 * 2");
test("2 + 2 - 2 + 2 * 2") // -2
// test("28 - 78 * 18 * 68 + 85 - 17"); // - 95 376





// P E M D A S 