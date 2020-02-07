function upArray(arr) {
    let operationTest = true;
    if (arr.join('') === "") return null;
    for (let i = (arr.length - 1); i >= 0; i--) {
        // Test if current arg is valable
        if (arr[i] === undefined || arr[i] < 0 || arr[i] > 10) return null;

        // Stop this part when the arg is != 0
        if (operationTest) {
            arr[i] += 1;
            if (arr[i] === 10 && i != 0) {
                arr[i] = 0;
            } else if (i === 0 && arr[i] === 10) {
                arr[i] = 0;
                arr.unshift(1);
                operationTest = false;
            } else {
                operationTest = false;
            }
        }
    }
    return arr
}