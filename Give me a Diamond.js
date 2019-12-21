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