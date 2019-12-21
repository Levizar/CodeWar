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
            stringTrimed = stringTrimed.trim();
            stringTrimed = stringTrimed.concat("\n");
            arrAnswer[i] = string + "*" + stringTrimed;
        }
        const arrayBot = [...arrAnswer]; // Need to do that to create a new array preventing reverse to apply to the 2 arrays
        arrayBot.reverse();
        arrAnswer.push((("*".repeat(n)).concat("\n")));
        arrAnswer = [...arrAnswer, ...arrayBot];
        const XD = arrAnswer.join('');
        return XD
    }
}