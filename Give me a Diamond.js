const diamond = (n) => {
    if (n % 2 == 0 || n <= 0) {
        return null
    } else {
        let array = [];
        const limit = Math.floor(n / 2);
        for (i = 0; i < limit; i++) {
            let string = "";
            for (j = 0; j < limit; j++) {
                (j < limit - i) ? string.concat(" "): string.concat("*");
            }
            let stringTrimed = string.trim();
            stringTrimed.concat("\n");
            array[i] = string + "*" + stringReversedTrimed;
        }
        arrayBot = array.reverse();
        array.push(("*".repeat(n)));
        array = [...array, ...arrayBot];
        const XD = array.join('');
        return XD
    }
}