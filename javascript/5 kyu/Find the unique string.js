const findUniq = arr => {
    const arrCopy = arr.map(string => [...new Set(string.toLowerCase().split(''))].sort().join(''))
    let indexToFind
    for (let i = 0; i < arrCopy.length; i++) {
        const item = arrCopy[i];
        const index1 = arrCopy.indexOf(item)
        const index2 = arrCopy.lastIndexOf(item)
        if (index1 === index2) {
            indexToFind = index1;
            break
        }
    }
    return arr[indexToFind]
}

const test = (fun, ans) => {
    if (fun === ans) {
        console.log("ok")
    } else {
        console.log("not ok : ");
        console.log("given: ", fun)
        console.log("expected: ", ans);
    }
}

test(findUniq(['Aa', 'aaa', 'aaaaa', 'BbBb', 'Aaaa', 'AaAaAa', 'a']), 'BbBb');
test(findUniq(['abc', 'acb', 'bac', 'foo', 'bca', 'cab', 'cba']), 'foo');
test(findUniq(['silvia', 'vasili', 'victor']), 'victor');
test(findUniq(['Tom Marvolo Riddle', 'I am Lord Voldemort', 'Harry Potter']), 'Harry Potter');
test(findUniq(['    ', 'a', ' ']), 'a');