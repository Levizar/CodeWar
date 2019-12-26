const Calculator = function() {
    this.evaluate = string => {
        let initArr = string.split(" ");

        // order of operation P E M D A S
        let arrNextOpReady = [];
        //Parentheses:
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
                    howMuchOpenPar -= 1;
                    const numberOfCharToCalculate = endIndexForSplice - i + 1;
                    let toCalculate = initArr.splice(startIndexForSplice, numberOfCharToCalculate);
                    toCalculate.shift();
                    toCalculate.pop();
                    // à vérifier si la ligne suivante marche. (voir si le this.evaluate(toCalculate) est ok)
                    initArr.splice(startIndexForSplice, 0, this.evaluate(toCalculate));
                    i = startIndexForSplice - 1;
                }
            }
            // End of loop for parentheses
        }
        // To do: other operation: EMDAS
    };
};
