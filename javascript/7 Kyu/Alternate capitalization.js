function capitalize(s) {
    let [even, odd] = [[], []];
    [...s].forEach((elm, i) => (i % 2 === 0 ? even.push(elm.toUpperCase()) && odd.push(elm) : odd.push(elm.toUpperCase()) && even.push(elm)));
    return [even, odd].map(x => x.join``);
}
