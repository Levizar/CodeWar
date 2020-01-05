const determinant = m => {
    switch (m.length) {
        case 1:
            return m[0][0];
            break;
        case 2:
            return m[0][0] * m[1][1] - m[0][1] * m[1][0];
            break;
        default:
            let det = 0;
            for (let i = 0; i < m[0].length; i++) {
                const deepClone = JSON.parse(JSON.stringify(m));
                deepClone.shift();
                deepClone.forEach((_, j, arr) => arr[j].splice(i, 1));
                i % 2 === 0 ? (det += m[0][i] * determinant(deepClone)) : (det -= m[0][i] * determinant(deepClone));
            }
            return det;
            break;
    }
};
