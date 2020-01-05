const snail = array => {
    let answer = [];
    let direction = 1;
    const n = (2 * array.length);
    for (let i = 0; array.length > 0; i++) {
        switch (direction) {
            case 1:
                //top left to top rigth
                answer = [...answer, ...array.shift()];
                break;
            case 2:
                //top right to bottom rigth
                answer = [...answer, ...array.map((elm, i, arr) => arr[i].pop())];
                break;
            case 3:
                // bottom rigth to bottom left
                let nextLine = array.pop();
                nextLine = Array.isArray(nextLine) ? nextLine.reverse() : nextLine;
                answer = [...answer, ...nextLine]
                break;
            case 4:
                // bottom left to top left
                answer = [...answer, ...array.map((elm, i, arr) => arr[i].shift()).reverse()];
                break;
        }
        direction += 1;
        direction = direction > 4 ? 0 : direction;
    }
    return answer;
}