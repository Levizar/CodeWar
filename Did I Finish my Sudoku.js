const doneOrNot = (board) => {
    let test = true;
    const arrArea = [...Array(9).keys()].map(x => []);

    for (let i = 0; i < 9; i++) {
        // Check line
        const lineSet = new Set(board[i]);
        lineSet.size === 9 ? 0 : test = false;
        
        // check column : construct an array for the column
        const currentColumn = [];
        for (let j = 0; j < 9; j++) {
            currentColumn.push(board[j][i]);

            // select the right arr for the area
            if (i < 3) {
                if (j < 3) {
                    a = 0;
                } else if (j < 6) {
                    a = 1;
                } else {
                    a = 2;
                }
            } else if (i < 6) {
                if (j < 3) {
                    a = 3;
                } else if (j < 6) {
                    a = 4;
                } else {
                    a = 5;
                }
            } else {
                if (j < 3) {
                    a = 6;
                } else if (j < 6) {
                    a = 7;
                } else {
                    a = 8;
                }
            }
            arrArea[a].push(board[i][j])
        }
        const columnSet = new Set(currentColumn);
        columnSet.size === 9 ? 0 : test = false;
    }

    arrArea.forEach((area, i) => {
        areaSet = new Set(area);
        areaSet.size === 9 ? 0 : test = false;
    });

    if (test) {
        return 'Finished!'
    } else {
        return 'Try again!'
    }
}