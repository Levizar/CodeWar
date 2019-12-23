const sum_pairs = (ints, s) => {
    // 1er test: les proches
    for (let i = 0; i < (ints.length - 1); i++) {
        if(ints[i] + ints[i+1] === s){
            return [ints[i],ints[i+1]]
        }
    }
    
    // 2nd test : test général en sautant les proches (j démarre à j+2 au lieu de +1)
    const sol =[];
    for(let i = 0; i < ints.length - 2; i++){
        for(let j = i + 2; j< ints.length - 1; j++){
            if(ints[i] + ints[j] === s){
                sol.push([ints[i], ints[j], j-1]);
            }
        }
    }
    const answer = sol.reduce((acc, elm, i, arr) => (elm[2] < acc[2]) ? elm : acc, sol[0])
    if(answer) answer.pop();
    return answer
}