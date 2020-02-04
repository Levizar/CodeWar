function bigIntfastExp(b, n) {
    if (n == 0n) return 1n
    if (n == 1n) return b
    if (n % 2n == 0n && n > 10n) {
        return bigIntfastExp(b, BigInt(n) / 2n) ** 2n
    }else {
        return BigInt(b) * bigIntfastExp(b, BigInt(n) - 1n)
    }
}

function fib(n) {
    if (n === 0) return 0n;
    if (n === 1) return 1n;
    if (n < 0) return fib(n + 2) - fib(n + 1);
    // if (n < )
    n = BigInt(n);
    const phi = 1.61803398874989;
    const phiBigInt = BigInt(phi * (10 ** 16));
    const sqrt5BigInt = BigInt(Math.sqrt(5) * (10 ** 16));
    const phiexpn = bigIntfastExp(phiBigInt, n);
    const dixepx15n = bigIntfastExp(10n, 15n * n)
    return (phiexpn) / ((dixepx15n) * sqrt5BigInt);
}


// let lol = fib(0);
// let lol = fib(1);
// let lol = fib(3);
// let lol = fib(3);
// let lol = fib(4);
let lol = fib(500000);

console.log(lol);

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