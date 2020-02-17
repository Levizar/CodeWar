function formatDuration(seconds) {
    if (seconds === 0) return "now";
    const arrSecToUnit = [31536000, 86400, 3600, 60, 1]; // Year, Day, hour, minute, second
    const unitTime = ["year", "day", "hour", "minute", "second"]
    const exactTimeArr = [];
    arrSecToUnit.reduce((acc, item) => {
        const rest = acc % item;
        const nbOfUnit = (acc - rest) / item;
        exactTimeArr.push(nbOfUnit);
        return rest;
    }, seconds);

    let time = exactTimeArr.map((elm, i) => {
        let str = unitTime[i];
        if (elm > 1) str += "s";
        return [elm, str];
    }).filter((arr) => arr[0] > 0).map((elm, i, arr) => {
        let str = elm.join(' ');
        if (i < arr.length - 2) {
            str += ", ";
        } else if (i < arr.length - 1) {
            str += " and ";
        }
        return str
    }).join('');

    return time;
}