// Sudoku end checker


// 3 steps validation:
// 9 differents numbers in the line
// 9 differents numbers in the column
// 9 differents numbers in the area

const doneOrNot = (board) => {
    let ended = true;

    board.forEach(arrLine => {
        const lineSet = new Set(arrLine);
        lineSet.length === 9 ? 0 : ended = false;
    });

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

        }
    }



    if (ended) {
        return 'Finished!'
    } else {
        return 'Try again!'
    }
}