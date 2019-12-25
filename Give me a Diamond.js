// First solution
const diamond = (n) => {
    if (n % 2 == 0 || n <= 0) {
        return null
    } else if (n == 1) {
        return "*\n"
    } else {
        let arrAnswer = [];
        const limit = Math.floor((n / 2));
        for (i = 0; i < limit; i++) {
            let string = "";
            for (j = 0; j < limit; j++) {
                (j < (limit - i)) ? (string = string.concat(" ")) : (string = string.concat("*"));
            }
            let stringTrimed = string
            stringTrimed = stringTrimed.trim().concat("\n");
            arrAnswer[i] = string + "*" + stringTrimed;
        }
        // This line make a real copy of arrAnswer. If I don't, .reverse() method applies itself to both arrayBot and arrAnswer
        const arrayBot = [...arrAnswer].reverse();
        arrAnswer.push((("*".repeat(n)).concat("\n")));
        arrAnswer = [...arrAnswer, ...arrayBot];
        const answer = arrAnswer.join('');
        return answer
    }
}

// second solution

const diamond = (n) => {
    if (n % 2 == 0 || n < 1) return null;
    let answer = [];
    for (let i = 0; i < n; i++) {
        const numbSpace = Math.abs(Math.floor(n / 2) - i);
        const numbStar = n - (2 * numbSpace);
        const str = " ".repeat(numbSpace) + "*".repeat(numbStar);
        answer.push(str);
    }
    answer = answer.join("\n").concat("\n");
    return answer
}

// third solution : not done yet
// = mix of the 2 below : gen only n/2 and duplicate it

const diamond = (n) => {
    if (n % 2 == 0 || n < 1) return null;
    if (n == 1) return "*\n";
    let answer = [];
    for (let i = 0; i < Math.floor(n / 2); i++) {
        const numbSpace = Math.abs(Math.floor(n / 2) - i);
        const numbStar = n - (2 * numbSpace);
        const str = " ".repeat(numbSpace) + "*".repeat(numbStar);
        answer.push(str);
    }
    let copy = [...answer].reverse();
    answer.push("*".repeat(n));
    answer = [...answer, ...copy];
    answer = answer.join("\n").concat("\n");
    return answer
}