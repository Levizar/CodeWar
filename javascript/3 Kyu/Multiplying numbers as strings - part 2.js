function multiply(a, b) {
    a = a.trim();
    b = b.trim();
    a = a.replace(/(\.[0]*$)|((?<=\..*)0*$)|(^[0]*)(?=.\..*)/g, "");
    b = b.replace(/(\.[0]*$)|((?<=\..*)0*$)|(^[0]*)(?=.\..*)/g, "");
    if (/(^$)|(^-$)|(^-0$)|(^-\.$)|(^\.$)/.test(a)|/(^$)|(^-$)|(^-0$)|(^-\.$)|(^\.$)/.test(b)) return "0"
    // Check for negativity
    let neg = "";
    if (((/-/gi.test(a)) && !(/-/gi.test(b))) || (!(/-/gi.test(a)) && (/-/gi.test(b)))) {
        neg = "-";
    }
    a = a.replace(/-/g, "");
    b = b.replace(/-/g, "");

    a = a.split('');
    b = b.split('');

    // Check for decimals
    let decimals = 0;
    if (a.includes(".")) {
        const indexDecimalA = a.indexOf(".");
        decimals += a.length - indexDecimalA - 1;
        a.splice(indexDecimalA, 1);
    }
    if (b.includes(".")) {
        const indexDecimalB = b.indexOf(".");
        decimals += b.length - indexDecimalB - 1;
        b.splice(indexDecimalB, 1);
    }

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
    for (let i = ans.length - 1; i >= 0; --i) {
        for (let j = 0; j < arrToSum.length; j++) {
            // Add all elements from this point j
            const elm = arrToSum[j][i];
            ans[i] += +elm
        }
        if (report != 0 || report != "") {
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

    // Add Decimals
    if (decimals > 0) {
        ans.splice(-decimals, 0, ".")
    }

    // Add the "-" or ""
    ans = ans.join('');
    ans = ans.replace(/(\.[0]*$)|((?<=\..*)0*$)|(^[0]*)(?=.\..*)|(^0*)/g, ""); // remove un-needed "0" and "."
    ans = neg + ans;
    if (ans === "" || ans === "-" || ans === "-0") ans = "0";
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



test(multiply("2", "3"), "6"); // ok
test(multiply("30", "69"), "2070"); // ok
test(multiply("11", "85"), "935"); // ok
test(multiply("-0.00", "0.0000"), "0"); // ok
test(multiply("-0.01", "0.0000"), "0"); // ok
test(multiply("2.01", "3.0000"), "6.03"); // ok
test(multiply("2", "-3.000001"), "-6.000002"); // ok
test(multiply("-5.0908", "-123.1"), "626.67748"); // ok
test(multiply("-5.0908", "-123.1"), "626.67748"); // ok
test(multiply("1", "0.0908"), "0.0908"); // ok
test(multiply("-070128938055520197089908455850062867145189989949335010268", "1084041283174914597483668766901055187"), '-76022663997400214657695684724986853060917324279889384581558503574630671477247067490679660116'); // ok
