const deleteDigit = n => {
    n = `${n}`.split('');
    for (let i = 0; i < n.length - 1; i++) {
        if (n[i] < n[i + 1]) {
            n.splice(i, 1);
            return +n.join('')
        }
    }
    n.splice(n.indexOf(`${Math.min(...n)}`), 1);
    return +n.join('')
}

deleteDigit(492923)