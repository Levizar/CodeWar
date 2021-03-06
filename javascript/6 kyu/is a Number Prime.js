const isPrime = n => {
    if (n === 2 || n === 3) return true;
    if (n < 2 || n % 2 === 0) return false;
    let floorsqrt = Math.floor(Math.sqrt(n));
    for (let i = 3; i <= floorsqrt; i = i + 2) {
        if (n % i == 0) return false;
    }
    return true;
}


function isPrime(n) {
    /* 
    fonction effectuant le test du dernier chiffre.
    */
    function isLastNumberPrimeExcluded(x) {
        if (x < 10) {
            return false;
        } else {
            const notExcludedLastDigit = [1, 3, 7, 9];
            let lastNumberFromx = x.toString();
            lastNumberFromx = parseInt(lastNumberFromx[lastNumberFromx.length - 1]);
            for (let i = 0; i < notExcludedLastDigit.length; i++) {
                if (lastNumberFromx === notExcludedLastDigit[i]) {
                    return false;
                }
            }
            return true;
        }
    }
    // Pour les "petits" nombres, simple vérification sur les nombres impairs de 1 à 100
    switch (true) {
        case n < 0:
        case n == 0:
        case n == 1:
            return false;
            break;
        case n == 2:
        case n == 3:
            return true;
            break;
        case n % 2 == 0:
            return false;
        case n <= 10000:
            let floorsqrt = Math.floor(Math.sqrt(n));
            for (let i = 3; i <= floorsqrt; i = i + 2) {
                if (n % i == 0) {
                    return false;
                }
            }
            return true;
            break;
        default:
            /* Etant donné n > 10000 ici, il n'est pas nécessaire de vérifier 
            si les nombres sont dans l'array.
            */
            if (isLastNumberPrimeExcluded == true) {
                return false;
            }
            let floorsqrt2 = Math.floor(Math.sqrt(n));
            let arrPrime = [2, 3, 5, 7, 11, 13];
            for (let i = 17; i <= floorsqrt2; i = i + 2) {
                if (i % 5 == 0) {
                    continue;
                }
                if (isPrime(i)) {
                    arrPrime.push(i);
                }
            }
            for (let i = 0; i < arrPrime.length; i++) {
                if (n % arrPrime[i] == 0) {
                    return false;
                }
            }
            return true;
    }
}
