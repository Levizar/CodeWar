const Calculator = function () {
    this.evaluate = string => {
        let initArr = string.split(" ");

        // order of operation P E M D A S

        // Check for Parentheses + recursion on the inside:
        // Voir si ne peut pas être remplacé par une regex : capturing group
        // et replace les capturing group par leur résultat
        for (let i = 0; i < initArr.length; i++) {
            // Enfermer le résultat dans une autre array et effectuer les opérations.
            // => fonction récursive
            let howMuchOpenPar = 0;
            let startIndexForSplice;
            if (initArr[i] === "(") {
                howMuchOpenPar += 1;
                if (howMuchOpenPar === 1) {
                    indexForSplice = i;
                }
            } else if (initArr[i] === ")") {
                if (howMuchOpenPar > 1) {
                    howMuchOpenPar -= 1;
                } else if (howMuchOpenPar === 1) {
                    (1 + 3 + 4)
                    howMuchOpenPar -= 1;
                    const numberOfCharToCalculate = i - startIndexForSplice + 1;
                    let toCalculate = initArr.splice(startIndexForSplice, numberOfCharToCalculate);
                    toCalculate.shift();
                    toCalculate.pop();
                    // à vérifier si la ligne suivante marche. (voir si le this.evaluate(toCalculate) est ok)
                    const result = this.evaluate(toCalculate);
                    initArr.splice(startIndexForSplice, 0, result);
                    // resume the index just behind the last parenthesis position.
                    i = startIndexForSplice - 1;
                }
            }
            // End of loop for parentheses
        }

        ///////////////////// exposant à faire
        for (let i = 0; i < initArr.length; i++) {

        }

        // Multiplication
        for (let i = 0; i < initArr.length; i++) {
            if (initArr[i] === "*") {
                let isSearchingNumber = true;
                let j = i - 1;
                let nbr1, nbr2;
                let result, startIndexForSplice
                while (isSearchingNumber) {
                    if (/[\d]/.match(initArr[j])) {
                        j -= 1;
                    } else {
                        isSearchingNumber = false;
                        nbr1 = initArr.splice((j + 1), (i - j - 1), 0);
                    }
                }
                startIndexForSplice = j + 1;
                isSearchingNumber = true;
                j = i + 1;
                while (isSearchingNumber) {
                    if (/[\d]/.match(initArr[j])) {
                        j += 1;
                    } else {
                        isSearchingNumber = false;
                        nbr2 = initArr.splice((i + 1), (j - i - 1), 0);
                        // reset the i to before the previous position
                        i = j;
                    }
                }
                nbr1 = nbr1.join('');
                nbr2 = nbr2.join('');
                result = +nbr1 + nbr2
                initArr.splice(startIndexForSplice, 0, result);
            }
        }

        // To do: other operation: EMDAS
    };
};