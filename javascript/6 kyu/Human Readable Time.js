const humanReadable = seconds => {
    const rest = seconds % 3600;
    let arr = [];
    arr.push((seconds - rest) / 3600, (rest - (rest % 60)) / 60, rest % 60);
    arr = arr.map(elm => (elm < 10 ? `0${elm}` : elm));
    return `${arr[0]}:${arr[1]}:${arr[2]}`;
};
