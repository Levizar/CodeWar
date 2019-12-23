function list(names){
    let arrName = names.map(elm => elm.name);
    if(arrName.length > 1){
        let lastName = arrName.pop();
        arrName = arrName.join(", ") + " & " + lastName;
        return arrName
    } else if(arrName[0] === undefined){
        return ""
    }else{
        return arrName[0]
    }
}

  // Clever solution from codewar

function list(names) {
    var xs = names.map(p => p.name)
    var x = xs.pop()
    return xs.length ? xs.join(", ") + " & " + x : x || ""
}