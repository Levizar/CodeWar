const digital_root = n => {
    if(`${n}`.length === 1){
        return n;
    } else{
        n = `${n}`.split('').reduce((acc, item) => +acc + +item, 0);
        return digital_root(n);
    }
}