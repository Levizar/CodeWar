const validateBattlefield = field => {
    let isBattlefieldValid = true; // default value
    let ships = {
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
        submartines: {
            expected: 4,
            size: 1,
            counted: 0
        }
    };

    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j]) {
                // Check for corner if occupied : return false
                if (field[i - 1][j - 1] || field[i - 1][j + 1] || field[i + 1][j - 1] || field[i + 1][j + 1]) return false;
                // check if ships from size 4,3,2 are touching by checking if lines cross
                if ((field[i - 1][j] || field[i + 1][j]) && (field[i][j - 1] || field[i][j + 1])) return false;

                // To Do : count the ships
                [
                    [4, 1],
                    [3, 2],
                    [2, 3],
                    [1, 4]
                ];
            }
        }
    }
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
