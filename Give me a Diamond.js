const diamond = (n) => {
    if (n % 2 == 0 || n <= 0) {
        return null
    } else if (n == 1) {
        return "*\n"
    } else {
        let array = [];
        const limit = Math.floor((n / 2));
        for (i = 0; i < limit; i++) {
            let string = "";
            for (j = 0; j < limit; j++) {
                (j < (limit - i)) ? (string = string.concat(" ")) : (string = string.concat("*"));
            }
            let stringTrimed = string
            stringTrimed = stringTrimed.trim();
            stringTrimed = stringTrimed.concat("\n");
            array[i] = string + "*" + stringTrimed;
        }
        arrayBot = array.reverse();
        array.push((("*".repeat(n)).concat("\n")));
        array = [...array, ...arrayBot];
        const XD = array.join('');
        return XD
    }
}

à obtenir
    ' *\n***\n *\n'
obtenu
    ' *\n***\n *\n***\n'
à obtenir
    '  *\n ***\n*****\n ***\n  *\n'
obtenu
    ' ***\n  *\n*****\n ***\n  *\n*****\n'