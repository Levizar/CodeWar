const divisibleByThree = str => {
    while(str.length > 1){
        str = `${ str.split('').reduce((acc, item) => acc + +item, 0) }`;
    }
    return !(+str % 3)
}

console.log(divisibleByThree("27")); // ok
console.log(divisibleByThree("28")); // ok