let numbers = [25469, 46895, 9775, 25357, 31187, 19203, 14173,
    41196, 12809, 11890, 23162, 21294, 22958, 25537, 31199, 35242,
    25969, 21709, 14411, 13151, 7054, 12491, 9891, 14568, 13109, 20748,
    60693, 29090, 36882, 5972, 36014, 32394, 12497, 32175, 12451, 28754,
    11564, 12660, 34230, 57472, 52424, 24967, 2350, 51569, 18567, 25679,
    12409, 42097, 8695, 14218, 53193, 24847, 3508, 12289, 37852, 61060, 13121,
    22021, 34611, 63357, 66, 10965, 57336, 24275, 61699, 13259, 59235, 9538, 58195,
    43147, 32880, 28406, 8270, 60688, 11804, 11871, 13577, 12823, 55157, 39471,
    25471, 26535, 13499, 31134, 26141, 59036, 59231, 4208, 26267, 8131, 20086,
    38349, 13007, 8738, 13627, 11265, 53469, 40792, 60930, 45805, 53645,
    13877, 29145, 27781, 35003, 35981, 17541, 13001, 17633, 14621, 24841,
    29508, 49532, 13947, 20550, 40873, 47734, 23418, 15378, 45434, 13210,
    25453, 13304, 40926, 13313, 20837, 7936, 36594, 36941, 13171, 10662, 21546,
    13339, 19208, 64230, 24605, 19406, 12592, 25717, 14387, 9205, 15946, 25498,
    13579, 17091, 18423, 13913, 11012, 12791, 55563, 12923
];

// retirer les nombres non premiers de la liste

function isPrime(num) {
    if (num < 0) {
        return false
    };
    switch (num) {
        case 0:
        case 1:
        case 4:
            return false;
            break;
        default:
            for (let x = 2; x < num / 2; x++) {
                if (num % x == 0) {
                    return false
                };
            }
    }
    return true;
}

let prime = numbers.filter(x => isPrime(x));

prime = prime.join('');