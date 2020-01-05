const findUniq = arr => {
    let constant;
    if (arr[0] === arr[1]) {
        constant = arr[0];
    } else if (arr[0] === arr[2]) {
        return arr[1];
    } else {
        if (isNaN(arr[0])) {
            return arr.filter(x => !isNaN(x))[0]
        } else {
            return arr[0];
        }
    }
    for (let i = 2; i < arr.length; i++) {
        if (constant !== arr[i]) return arr[i];
    }
}