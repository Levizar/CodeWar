// Not working already

function nextSmaller(n) {
    let str = `${n}`;
    for (let i = str.length - 2; i >= 0; --i) {
        if (str[i] > str[i + 1]) {
            // switch nbr
            let pivot = str[i];
            let substr = str.slice(i, str.length);
            let switcher = Math.max(...substr);
            let index = str.lastIndexOf(switcher);
            str = str = str.split('');
            str[i] = str[index];
            str[index] = pivot;
            str = str.join('');
            break
        } else if (i === 0) {
            return -1
        }
    }
    const ans = +str;
    return ans
}