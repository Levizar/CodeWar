// Thx to https://fr.wikipedia.org/wiki/Distance_de_Levenshtein

function Dictionary(words) {
    this.words = words;
}

Dictionary.prototype.findMostSimilar = function(term) {
    let arrOfLevenshteinDistance = this.words.map(testedWord => LevenshteinDistance(term, testedWord));
    const minDist = Math.min(...arrOfLevenshteinDistance);
    const indexOfShorterDistantWord = arrOfLevenshteinDistance.findIndex(item => item === minDist);
    const shorterDistantWord = this.words[indexOfShorterDistantWord];
    return shorterDistantWord;
};
const LevenshteinDistance = (chaine1, chaine2) => {
    // Calculer la distance de levenshtein ici
    const d = [...Array(chaine1.length + 1)].map((line, i) =>
        [...Array(chaine2.length + 1)].map((item, j) => {
            if (j === 0) return i;
            if (i === 0) return j;
            return 0;
        })
    );
    let substitutionCost;
    for (let i = 1; i <= chaine1.length; i++) {
        for (let j = 1; j <= chaine2.length; j++) {
            substitutionCost = chaine1[i] === chaine2[j] ? 0 : 1;
            d[i][j] = Math.min(
                d[i - 1][j] + 1, // Remove the char from chaine 1
                d[i][j - 1] + 1, // Insert the char from chaine 1 in chaine 2
                d[i - 1][j - 1] + substitutionCost // substitution
            );
        }
    }
    const distance = d[chaine1.length][chaine2.length];
    return distance;
};
