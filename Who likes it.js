function likes(names) {
    let namesLength = names.length;
    if (!namesLength) {
        return "no one likes this"
    } else if (namesLength < 2) {
        return `${names[0]} likes this`
    } else if (namesLength < 4) {
        const last = names.pop();
        names = names.join(', ');
        return `${names} and ${last} like this`
    } else {
        let firstTwo = names.splice(0, 2);
        firstTwo = firstTwo.join(', ');
        namesLength = names.length;
        return `${firstTwo} and ${namesLength} others like this`
    }
}