function list(names) {
    let arrName = names.map(elm => elm.name);
    if (arrName.length > 1) {
        let lastName = arrName.pop();
        arrName = arrName.join(", ") + " & " + lastName;
        return arrName
    } else if (arrName[0] === undefined) {
        return ""
    } else {
        return arrName[0]
    }
}

// Clever solution from codewar

function list(names) {
    var xs = names.map(p => p.name)
    var x = xs.pop()
    // Check if the length is 0
    // If not, do the correct answer
    // If length is 0
    // Answer with the "poped" variable if it exist otherwise with an empty string
    // the x || "" is possible because JS evaluates the x as truthy or falsy
    return xs.length ? xs.join(", ") + " & " + x : x || ""
}