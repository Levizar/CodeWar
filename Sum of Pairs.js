
// This code timeout
const sum_pairs = (ints, s) => {
    // 1er test: les proches
    for (let i = 0; i < (ints.length - 1); i++) {
        if(ints[i] + ints[i+1] === s){
            return [ints[i],ints[i+1]]
        }
    }
    
    // 2nd test : test général en sautant les proches (j démarre à j+2 au lieu de +1)
    const sol =[];
    for(let i = 0; i < ints.length - 1; i++){
        for(let j = i + 2; j< ints.length; j++){
            if(ints[i] + ints[j] === s){
                sol.push([ints[i], ints[j], j-i]);
            }
        }
    }
    
    const answer = sol.reduce((acc, elm, i, arr) => (elm[2] < acc[2]) ? elm : acc, sol[0])
    if(answer) answer.pop();
    return answer
}

// Autre solution: 1 boucle réel, une recherche sur set (= boucle + courte)

const sum_pairs = (ints, s) => {
    if (ints.length < 2) return undefined;
    const firstPossiblePair = new Set();
    firstPossiblePair.add(ints[0]);
    for (let i = 1; i < ints.length; i++){
        if(firstPossiblePair.has(s - ints[i])) return [(s - ints[i]), ints[i]];
        firstPossiblePair.add(ints[i]);
    }
    return undefined
}