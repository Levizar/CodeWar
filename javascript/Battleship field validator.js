const validateBattlefield = field => {
    // Object containing the name of ships and characteristics
    const ships = {
        battleship: {
            expected: 1,
            size: 4,
            counted: 0
        },
        cruisers: {
            expected: 2,
            size: 3,
            counted: 0
        },
        destroyers: {
            expected: 3,
            size: 2,
            counted: 0
        },
        submarines: {
            expected: 4,
            size: 1,
            counted: 0
        }
    };
    const shipsArr = Object.keys(ships).map((ship, i, arr) => [ship, Object.values(ships)[i]]);

    const copyField = field;
    field.push();

    // 1) Check for touching ships
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j]) {
                // Check for corner if occupied : return false

                // the first field[i-/+1] condition verify if the line exist before acceding to the sub array
                if (
                    (field[i - 1] && field[i - 1][j - 1]) ||
                    (field[i - 1] && field[i - 1][j + 1]) ||
                    (field[i + 1] && field[i + 1][j - 1]) ||
                    (field[i + 1] && field[i + 1][j + 1])
                )
                    return false;
                // check if ships from size 4,3,2 are touching by checking if lines cross
                // We do not verify the size 1 because they will not be counted as submarines if they touch with another which lead to false disposition
                // the first field[i-/+1] condition verify if the line exist before acceding to the sub array
                if (((field[i - 1] && field[i - 1][j]) || (field[i + 1] && field[i + 1][j])) && ((field[i] && field[i][j - 1]) || (field[i] && field[i][j + 1]))) return false;
            }
        }
    }

    // 2) Check numbers of ships :
    // At this point ships aren't touching so we can assume that every touching point are part of a ship
    const checkingField = field.map(line => line.map(elm => false));

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            // has ij already been checked ?
            if (checkingField[i][j] == false) {
                checkingField[i][j] = true;
                // Check if ship on ij
                if (field[i][j]) {
                    // If yes, we start analysing the grid and the around area
                    let checking = true;
                    let size = 1;
                    // Check around for other part of ship. We don't check j-1 or i-1 because we already checked it
                    if (field[i][j + 1]) {
                        // means it's horizontal
                        while (checking) {
                            checkingField[i][j + size] = true;
                            if (field[i][j + size]) {
                                size++;
                            } else {
                                checking = false;
                            }
                        }
                    } else if (field[i + 1] && field[i + 1][j]) {
                        // field[i+1] && => verify if the line exist
                        // means it's vertical
                        while (checking) {
                            checkingField[i + size][j] = true;
                            if (field[i + size] && field[i + size][j]) {
                                // field[i+size] && => verify if the line exist
                                size++;
                            } else {
                                checking = false;
                            }
                        }
                    } else {
                        // means it's a submarines : do nothing
                        checking = false;
                    }
                    // We have the size of the ship, we have to get the type and increment its count
                    checking = true;
                    for (const [ship, car] of shipsArr) {
                        if (car.size == size) {
                            checking = false;
                            ships[ship]["counted"] += 1;
                            if (ships[ship]["counted"] > ships[ship]["expected"]) return false;
                            break;
                        }
                    }
                    if (checking) return false;
                }
            }
        }
    }

    // At this point we know there isn't too much ship but we have to check if there is too few of it

    // If the grid passes all the test, then it's true
    return true;
};

// // function to check if corner are occupied
// const isCornerOccupied = (i, j) => {
//     if(i === 0 && j === 0){
//         if(field[i+1][j+1]){
//             return false
//         }
//     }else if(i === 0 && j === field[i].length){
//         if(field[i+1][j-1]){
//             return false
//         }
//     }else if(i === 0){
//         if(field[i+1][j+1] || field[i+1][j-1]){
//             return false
//         }
//     }else if(i === field.length && j === 0){
//         if(field[i-1][j+1]){
//             return false
//         }
//     }else if(i === field.length && j === field[i].length){
//         if(field[i-1][j-1]){
//             return false
//         }
//     }else if(i === field.length){
//         if(field[i-1][j-1] || field[i-1][j+1]){
//             return false
//         }
//     }else if(j === 0){
//         if(field[i-1][j+1] || field[i+1][j+1]){
//             return false
//         }
//     }else if(j === field[i].length){
//         if(field[i-1][j-1] || field[i+1][j-1]){
//             return false
//         }
//     }else{
//         if(field[i-1][j-1] || field[i-1][j+1] || field[i+1][j-1] || field[i+1][j+1]){
//             return false
//         }
//     }
//     return true
// }
