// Solution: the last digit of exponent = last digit * mod4 of the exponent
// mod 4 of exponent = last 2 digits % mod 4
// => need to find the last 2 digits
// Code from the kyu 5 last digit exe

const lastDigitKyu5 = (str1, str2) => {
    str1 = `${str1}`;
    str2 = `${str2}`;
    if (str2 === '0') return 1;
    if (str1 === '0') return 0;
    let rest = 0;
    for (let i = 0; i < str2.length; i++) {
        rest = (rest * 10 + parseInt(str2[i], 10)) % 4;
    }
    if (rest === 0) rest = 4;
    return Math.pow(str1.slice(-1), rest) % 10;
};

const lastDigit = as => {
    if (as.length == 0) return 1;
    const twoLastDigit = as.reduceRight((acc, item, i, arr) => {
        if (acc === 0) return 1;
        const lastDigitItem = `${item}`.slice(-1);
        if (/[0156]/.test(lastDigitItem)) return +lastDigitItem;
        const lastDigitCalculatedCurrentItem = lastDigitKyu5(item, acc);
        let toReturn;
        if (item.length > 1) {
            const SecondLastDigit = (+item.slice(-2, -1) * +acc.slice(-1)) % 10;
            toReturn = `${SecondLastDigit}${lastDigitCalculatedCurrentItem}`;
        } else {
            toReturn = `${lastDigitCalculatedCurrentItem}`;
        }
        return toReturn;
    }, 1);
    const last = +twoLastDigit;
    return last;
};

// const lastDigitKyu5 = (str1, str2) => (+str2 === 0 ? 1 : Math.pow(+str1.slice(-1), (+str2.slice(-2) % 4) + 4) % 10);

// Test
const test = (fun, ans) => {
    if (fun === ans) {
        console.log('NOICE !');
    } else {
        console.log('Not Noice !');
        console.log('got: ', fun);
        console.log('exp: ', ans);
    }
};
// test(lastDigit([]), 1); // ok
// test(lastDigit([0, 0]), 1); // ok
// test(lastDigit([0, 0, 0]), 0); // ok
// test(lastDigit([1, 2]), 1); // ok
// test(lastDigit([3, 4, 5]), 1); // ok
// test(lastDigit([4, 3, 6]), 4); // ok
// test(lastDigit([2, 2, 2, 0]), 4); // ok
// test(lastDigit([937640, 767456, 981242]), 0); // ok
// test(lastDigit([499942, 898102, 846073]), 6); // ok
// var r1 = Math.floor(Math.random() * 100);
// var r2 = Math.floor(Math.random() * 10);
// test(lastDigit([]), 1); // ok
// test(lastDigit([r1]), r1 % 10); // ok
// test(lastDigit([r1, r2]), Math.pow(r1 % 10, r2) % 10); // ok

test(lastDigit([7, 6, 21]), 1);
// test(lastDigit([12, 30, 21]), 6);
// test(lastDigit([123232, 694022, 140249]), 6);

const lastTwoDigitsOfAproduct = (p1, p2) => {
    p1 = `${p1}`;
    p2 = `${p2}`;
    if (p1 == 0 || p2 == 0) return 0;
    if (p1 > 9) {
        const a = p1.slice(-2, -1);
        const b = p1.slice(-1);
    } else {
        const a = 0;
        const b = p1.slice(-1);
    }
    if (p2 > 9) {
        const c = p2.slice(-2, -1);
        const d = p2.slice(-1);
    } else {
        const c = 0;
        const d = p2.slice(-1);
    }
    const lastDigit = (d * b) % 10;
    const rest = d * b - lastDigit;
    const SecondLastDigit = (((d * a + rest) % 10) + c * b) % 10;
    const twoLastDigit = `${SecondLastDigit}${lastDigit}`;
    return +twoLastDigit;
};

const lastTwoDigitsOfExponent = (base, exponent) => {
    if (base % 10 == 1) {
        const lastDigit = 1;
        const baseSecondDigit;
        if (base > 9) {
            baseSecondDigit = +`${base}`.slice(-2, -1);
        } else {
            baseSecondDigit = 0;
        }
        const exponentLastDigit = +`${exponent}`.slice(-1);
        const SecondLastDigit = (baseSecondDigit * exponentLastDigit) % 10;
        const twoLastDigit = `${SecondLastDigit}${lastDigit}`;
        return +twoLastDigit
    } else if (base % 10 == 9){
        // If the base LD is 9, we convert it to go back to base LD in 1
        if (exponent % 2 == 0) {
            const squaredBase = Math.pow(base, 2);
            const halfedExponent = exponent / 2;
            const twoLastDigit = lastTwoDigitsOfExponent(squaredBase, halfedExponent);
            return +twoLastDigit;
        } else {
            const squaredBase = Math.pow(base, 2);
            const halfEvenedExponent = (exponent - 1) / 2;
            const intermediateLD = lastTwoDigitsOfExponent(squaredBase, halfEvenedExponent);
            const twoLastDigit = lastTwoDigitsOfAproduct(base,intermediateLD);
            return +twoLastDigit;
        }
    } else if(base % 10 == 3){
        // If the base LD is 3, we convert it to go back to base LD in 1
        if (exponent % 4 == 0) {
            const exponedBase = Math.pow(base, 4);
            const dividedExponent = exponent / 4;
            const twoLastDigit = lastTwoDigitsOfExponent(exponedBase, dividedExponent);
            return +twoLastDigit;
        } else if(exponent % 4 == 1){
            const exponedBase = Math.pow(base, 4);
            const dividedExponent = (exponent - 1) / 4;
            const intermediateLD = lastTwoDigitsOfExponent(exponedBase, dividedExponent);
            const twoLastDigit = lastTwoDigitsOfAproduct(base,intermediateLD);
            return +twoLastDigit;
        } else if (exponent % 4 == 2){
            const exponedBase = Math.pow(base, 4);
            const dividedExponent = (exponent - 2) / 4;
            const intermediateLD1 = lastTwoDigitsOfExponent(exponedBase, dividedExponent);
            const intermediateLD2 = lastTwoDigitsOfExponent(base, 2);
            const twoLastDigit = lastTwoDigitsOfAproduct(intermediateLD1,intermediateLD2);
            return +twoLastDigit;
        }
    }
    // To continue !
};

const lastDigit = as => {
    return last;
};
