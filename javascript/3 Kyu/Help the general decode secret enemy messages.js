// // device.encode ('')

// let possibleLetter = "abcdefghijklmnopqrstuvwxyz";
// possibleLetter = possibleLetter.toUpperCase() + possibleLetter + "?,. "
// device.decode = sentence => {
//     const dictionary = [];
//     // Testing all position
//     for (let i = 0; i < sentence.length; ++i) {
//         const alphabetForThisPosition = {};
//         for (let j = 0; j < possibleLetter.length; ++j) {
//             const letter = possibleLetter[j];
//         }
//         dictionary.push(alphabetForThisPosition);
//     }
// }

// Test 2

let possibleLetter = "abcdefghijklmnopqrstuvwxyz";
possibleLetter = possibleLetter.toUpperCase() + possibleLetter + "?,. ";
device.decode = sentence => {
    let positionDictionary = [...Array(possibleLetter.length)].map(x => ({}));
    // For each letter => get the correspondance
    for (let i = 0; i < possibleLetter.length; ++i) {
        const letters = possibleLetter[i].repeat(sentence.length);
        const cryptedLetters = device.encode(letters);
        // For each correspondance => put it in the position relative dictionnary
        for (let j = 0; j < cryptedLetters.length; ++j) {
            const singleCryptedLetter = cryptedLetters[j];
            positionDictionary[j][`${singleCryptedLetter}`] = possibleLetter[i];
        }
    }
    // Use the dictionnary to decode the sentence
    let decodedSentence = "";
    for (let i = 0; i < sentence.length; i++) {
        const codedLetter = sentence[i];
        const decodedLetter = positionDictionary[i][codedLetter];
        decodedSentence += decodedLetter;
    }
    return decodedSentence;
};
