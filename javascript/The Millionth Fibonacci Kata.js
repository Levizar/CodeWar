function fib(n) {
    if (n === 0) return 0n;
    if (n === 1) return 1n;
    if (n < 0) return fib(n + 2) - fib(n + 1);

    // bigInt :
    const phi = 1.61803398874989;
    BigInteger.exponentiate = function (x, y) {
        if (typeof x === "number" && typeof y === "number" && y >= 0 && y < 53) { // Math.log2(9007199254740991 + 1)
          var value = 0 + Math.pow(x, y);
          if (value >= -9007199254740991 && value <= 9007199254740991) {
            return value;
          }
        }
        return exponentiate(x, y);
      };
    return Math.round(Math.pow(phi, n) / Math.sqrt(5));
}

function fastExp(b, n) {
    if (n % 2n == 0n || n % 2 == 0) {
        return (b**2) * fastExp(b,(n/2n))
    } else{
        return b ** 
    }
}

// (define (fast-expt b n)
//   (cond ((= n 0) 1)
//         ((even? n) (square (fast-expt b (/ n 2))))
//         (else (* b (fast-expt b (- n 1))))))

let cache = {
    "0": 0n,
    "1": 1n,
    "2": 1n,
    "3": 2n
};
function fib(n) {
    if (n === 0) return 0n;
    if (n === 1) return 1n;
    if (cache[`${n}`]) {
        return cache[`${n}`];
    } else {
        fibN = fib(n - 2) + fib(n - 1);
        cache[`${n}`] = fibN;
        return fibN;
    }
}

function fib(n) {
    if (n === 0) return 0n;
    if (n === 1) return 1n;
    if (n < 0) return fib(n + 2) - fib(n + 1);
    return fib(n - 2) + fib(n - 1);
}
