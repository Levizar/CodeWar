// First version : not ok
const comp = (a, b) => {
    if (a === null || b === null || a.length !== b.length) return false
    if (a.join('') === b.join('')) return true
    let aa = a.map(elm => elm * elm);
    let test = true;
    aa.forEach(elm => b.includes(elm) ? 0 : test = false);
    let bb = b.map(elm => Math.sqrt(elm));
    bb.forEach(elm => a.includes(elm) ? 0 : test = false);
    return test
}


// Second version : can be tricked
const comp = (a, b) => {
    if (a === null || b === null || a.length !== b.length) return false
    if (a.join('') === b.join('')) return true
    let test = true
    let aa = a.reduce((acc, item) => acc + (item * item), 0);
    let bb = b.reduce((acc, item) => acc + item, 0);
    aa === bb ? 0 : (test = false)
    return test
}

// combine the two previous one:
const comp = (a, b) => {
    if (a === null || b === null || a.length !== b.length) return false
    if (a.join('') === b.join('')) return true
    let test = true
    // Sum test
    a.reduce((acc, item) => acc + (item * item), 0) === b.reduce((acc, item) => acc + item, 0) ? 0 : (test = false)
    if (!test) return test
    // Includes test if sum test pass
    let aa = a.map(elm => elm * elm);
    aa.forEach(elm => b.includes(elm) ? 0 : test = false);
    if (!test) return test
    let bb = b.map(elm => Math.sqrt(elm));
    bb.forEach(elm => a.includes(elm) ? 0 : test = false);
    return test
}

// simpler solution
const comp = (a, b) => (a1 === null || a2 === null) && a.map(x => x * x).sort().join `` === b.sort().join ``