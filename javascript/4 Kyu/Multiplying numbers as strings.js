// Ok for Node 10 but not for Node 8 which is used in this kata
// function multiply(a, b)
// {
//  a = BigInt(a);
//  b = BigInt(b);
//  c = a * b
//  c = c.toString()
//  return c
// }

function multiply(a, b) {
    a = a.split('');
    b = b.split('');
    let arrToSum = [...Array(b.length)].map(x => []);
    let report = 0;
    // Multiplicating
    for (let i = b.length - 1; i >= 0; --i) {
        // shift of k 0 
        for (let k = b.length - 1 - i; k > 0; --k) {
            arrToSum[i].unshift("0");
        }
        for (let j = a.length - 1; j >= 0; --j) {
            let c = +((+a[j]) * (+b[i])) + +report; // "+ +report" = "+ Number(report)""
            report = 0;
            if (c > 9 && j > 0) {
                c = `${c}`;
                c = c.split('');
                report = c.splice(0, c.length - 1);
                report = +report.join('');
                c = c.join('');
            } else {
                c = `${c}`;
            }
            arrToSum[i].unshift(c);
            if (j == 0) {
                if (report != 0 || report != "") arrToSum[i].unshift(report);
                report = 0;
                arrToSum[i] = arrToSum[i].join('');
            }
        }
    }
    // Parse the result for sum
    const maxLength = Math.max(...arrToSum.map(elm => elm.length));
    arrToSum = arrToSum.map(elm => {
        const diff = maxLength - elm.length;
        if (diff > 0) {
            let nbr = "0".repeat(diff) + elm;
            nbr = nbr.split('');
            return nbr;
        } else {
            elm = elm.split('');
            return elm
        }
    })

    report = 0
    let ans = [...Array(maxLength)].map(x => 0);
    // sum
    for (let i = ans.length - 1; i >= 0 ; --i) {
        for (let j = 0; j < arrToSum.length; j++) {
            // Add all elements from this point j
            const elm = arrToSum[j][i];
            ans[i] += +elm
        }
        if(report != 0 || report != ""){
            ans[i] += report;
            report = 0;
        } 
        if (ans[i] > 9 && i != 0) {
            ans[i] = `${ans[i]}`;
            ans[i] = ans[i].split('');
            report = ans[i].splice(0, ans[i].length - 1);
            report = +report.join('');
            ans[i] = ans[i].join('');
        }
        ans[i] = `${ans[i]}`;
    }
    
    ans = ans.join('');
    ans = ans.replace(/^[0]*/g,"");
    if(ans === "") ans = "0";
    return ans
}




const test = (fun, ans) => {
    if (fun === ans) {
        console.log("ok")
    } else {
        console.log("not ok : ");
        console.log("given: ", fun)
        console.log("expected: ", ans);
    }
}

// All ok

test(multiply("2", "3"), "6"); // ok
test(multiply("30", "69"), "2070"); // ok
test(multiply("11", "85"), "935"); // ok

test(multiply("98765", "56894"), "5619135910");
test(multiply("1020303004875647366210", "2774537626200857473632627613"), "2830869077153280552556547081187254342445169156730");
test(multiply("58608473622772837728372827", "7586374672263726736374"), "444625839871840560024489175424316205566214109298");
test(multiply("9007199254740991", "9007199254740991"), "81129638414606663681390495662081");