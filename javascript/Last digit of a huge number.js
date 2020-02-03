// Not finished


const lastDigit = (str1, str2) => {
    if (str2 === "0") return 1;
    if (str1 === "0") return 0;
    let rest = 0;
    for (let i = 0; i < str2.length; i++) {
        rest = (rest * 10 + parseInt((str2[i]), 10)) % 4;
    }
    if (rest === 0) rest = 4;
    return Math.pow(str1.slice(-1), rest) % 10;
}

const lastDigit = (str1, str2) => +str2 === 0 ? 1 : Math.pow(+str1.slice(-1), ((+str2.slice(-2) % 4) + 4)) % 10;


const lastDigit = (arr) => {
    arr.reverse();
    arr.reduce((acc, item, i, arr) => {
        if (i === 0) {
            return item
        } else {
            (item, str2) => +str2 === 0 ? 1 : Math.pow(+str1.slice(-1), ((+str2.slice(-2) % 4) + 4)) % 10;
        }
    }, 0)

    arr.
}