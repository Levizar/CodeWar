// function bigIntfastExp(b, n) {
//     if (n == 0n) return 1n
//     if (n == 1n) return b
//     if (n % 2n == 0n) {
//         return bigIntfastExp(b, BigInt(n) / 2n) ** 2n
//     }else {
//         return BigInt(b) * bigIntfastExp(b, BigInt(n) - 1n)
//     }
// }

// function fib(n) {
//     if (n === 0) return 0n;
//     if (n === 1) return 1n;
//     if (n < 0) return fib(n + 2) - fib(n + 1);
//     // if (n < )
//     n = BigInt(n);
//     const phi = 1.61803398874989;
//     const phiBigInt = BigInt(phi * (10 ** 16));
//     const sqrt5BigInt = BigInt(Math.sqrt(5) * (10 ** 16));
//     const phiexpn = bigIntfastExp(phiBigInt, n);
//     const dixepx15n = bigIntfastExp(10n, 15n * n)
//     return (phiexpn) / ((dixepx15n) * sqrt5BigInt);
// }


// let lol = fib(0);
// let lol = fib(1);
// let lol = fib(3);
// let lol = fib(3);
// let lol = fib(4);
// let lol = fib(500000);

// console.log(lol);

// function fib(n) {
//     if (n === 0) return 0n;
//     if (n === 1) return 1n;
//     if (n < 0) return fib(n + 2) - fib(n + 1);
//     let [i, j] = [0n, 1n]
//     let q = 0n;
//     for (let k = 2; k <= n; k++) {
//         i = j;
//         j = q;
//         q = i + j;
//     }
//     return q
// }







// return Math.round(Math.pow(phi, n) / Math.sqrt(5));

// function fastExp(b, n) {
//     if (n % 2n == 0n || n % 2 == 0) {
//         return (b**2) * fastExp(b,(n/2n))
//     } else{
//         return b ** 
//     }
// }

// (define (fast-expt b n)
//   (cond ((= n 0) 1)
//         ((even? n) (square (fast-expt b (/ n 2))))
//         (else (* b (fast-expt b (- n 1))))))

// let cache = {
//     "0": 0n,
//     "1": 1n,
//     "2": 1n,
//     "3": 2n
// };
// function fib(n) {
//     if (n === 0) return 0n;
//     if (n === 1) return 1n;
//     if (cache[`${n}`]) {
//         return cache[`${n}`];
//     } else {
//         fibN = fib(n - 2) + fib(n - 1);
//         cache[`${n}`] = fibN;
//         return fibN;
//     }
// }

// function fib(n) {
//     if (n === 0) return 0n;
//     if (n === 1) return 1n;
//     if (n < 0) return fib(n + 2) - fib(n + 1);
//     return fib(n - 2) + fib(n - 1);
// }







//// TEST MULTIPLICATION MATRICIELLE

// let a = [
//     [0, 1],
//     [1, 1]
// ];

function fastExpSquaredMat(mat, n) {
    const a = mat[0][0];
    const b = mat[0][1];
    const c = mat[1][0];
    const d = mat[1][1];
    if (n == 0n) {
        return mat;
    } else if (n == 2n) {
        const ans = [
            [(a * a + b * c), (a * b + b * d)],
            [(c * a + d * c), (c * b + d * d)]
        ];
        return fastExpSquaredMat(ans, n / 2n);
    } else if (n % 2n == 0n) {
        return fastExpSquaredMat(fastExpSquaredMat(mat, n / 2n), 2n);
    } else {
        const sousMat = fastExpSquaredMat(mat, n - 1n);
        // mat * sousMat
        const e = sousMat[0][0];
        const f = sousMat[0][1];
        const g = sousMat[1][0];
        const h = sousMat[1][1];
        const ans = [
            [(e * a + f * c), (e * b + f * d)],
            [(g * a + h * c), (g * b + h * d)]
        ];
        return ans
    }
}

function fib(n) {
    n = BigInt(n);
    if (n == 0n) return 0n;
    if (n == 1n) return 1n;
    if (n < 0) return fib(n + 2) - fib(n + 1);
    let matI = [
        [0n, 1n],
        [1n, 1n]
    ];
    const firstTerm = fastExpSquaredMat(matI, n);
    const a = firstTerm[0][0];
    const b = firstTerm[0][1];
    const c = firstTerm[1][0];
    const d = firstTerm[1][1];
    const lastMat = [b, d];
    return b
}


// let lol = fib(0);
// let lol = fib(1);
let lol = fib(3);
// let lol = fib(3);
// let lol = fib(4);
// let lol = fib(500000);