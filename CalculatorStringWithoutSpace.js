const Calculator = function () {
    this.evaluate = string => {
        console.log(string);
        // Get the () group and use recursion on it until it found the smallest group
        while (/[()]/g.test(string)) {
            string = string.replace(/[(][^()]*[)]/g, (corresp) => {
                corresp = corresp.split(' ');
                corresp.shift();
                corresp.pop();
                corresp = corresp.join(' ')
                return this.evaluate(corresp);
            })
        }
        let initArr = string.split(' ');
        // function to perform one of the 4 basic operation
        function basicOperation(operationToPerform) {
            for (let i = 0; i < initArr.length; i++) {
                if (initArr[i] === operationToPerform) {
                    let isSearchingNumber = true;
                    let j = i - 1;
                    let nbr1, nbr2;
                    let result, startIndexForSplice
                    while (isSearchingNumber) {
                        if (/[\d]/.test(initArr[j])) {
                            j -= 1;
                        } else {
                            isSearchingNumber = false;
                            nbr1 = initArr.splice((j + 1), (i - j - 1));
                        }
                    }
                    startIndexForSplice = j + 1;
                    isSearchingNumber = true;
                    j = i + 1;
                    while (isSearchingNumber) {
                        if (/[\d]/.test(initArr[j])) {
                            j += 1;
                        } else {
                            isSearchingNumber = false;
                            nbr2 = initArr.splice((i), (j - i));
                            // reset the i to before the previous position
                            i = j - 2;
                        }
                    }

                    nbr1 = parseFloat(nbr1.join(''));
                    nbr2 = parseFloat(nbr2.join(''));

                    switch (operationToPerform) {
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
                            break;
                    }
                    initArr.splice(startIndexForSplice, 1, result);
                }
            }
        }

        // Execute the basic operation
        ["**", "*", "/", "+", "-"].forEach(operation => basicOperation(operation));


        return initArr.join('');
    };
};

// test script:

function test(stringTest) {
    let calculate = new Calculator();
    let b = calculate.evaluate(stringTest);
    console.log("***********", stringTest, " = ", b);
}

test("  - 2");





// P E M D A S 