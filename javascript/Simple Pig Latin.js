const pigIt = str => {
    const newStr = str.replace(/([\w]+)/g, word => {
        let answer = [...word];
        const toPush = answer.shift();
        answer.push(toPush, "ay");
        return answer.join("");
    });
    return newStr;
};

// refactor

const pigIt = str => str.replace(/([\w]+)/g, word => word.slice(1) + word[0] + "ay");
