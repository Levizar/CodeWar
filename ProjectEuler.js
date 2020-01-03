const numberPalindrom = () => {
    const arrPalindrom = [];
    for (let i = 999; i > 99; i--) {
        for (let j = i; j > 99; j--) {
            let number = j * i;
            number = number.toString();
            if (number === [...number].reverse().join('')) {
                arrPalindrom.push(number);
            }
        }
    }
    arrPalindrom.sort((a, b) => b - a);
    return arrPalindrom
}

const numberPalindrom2 = () => {
    for (let i = (999 * 999); i > 0; i--) {
        let number = (i).toString();
        if (number === [...number].reverse().join('')) {
            // console.log(number);
            for (let j = 999; j > 0; j--) {
                if (i % j === 0) {
                    // console.log(j);
                    if ((99 < (i / j)) && (1000 > (i / j))) {
                        console.log(number);
                        return i;
                    }
                }
            }
        }
    }
}

numberPalindrom2()