function sumStrings(a, b) {
    let report = 0;
    let arrToSum = [(a = `${a}`), (b = `${b}`)];
    const maxLength = Math.max(a.length, b.length);
    arrToSum = arrToSum.map(elm => {
        const diff = maxLength - elm.length;
        if (diff > 0) {
            let nbr = '0'.repeat(diff) + elm;
            nbr = nbr.split('');
            return nbr;
        } else {
            elm = elm.split('');
            return elm;
        }
    });
    let ans = [...Array(maxLength)].map(x => 0);
    // sum
    for (let i = ans.length - 1; i >= 0; --i) {
        for (let j = 0; j < arrToSum.length; j++) {
            // Add all elements from this point j
            const elm = +arrToSum[j][i];
            ans[i] += +elm;
        }
        if (report != 0 || report != '') {
            ans[i] += +report;
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
    if (report != 0 || report != '' || report != '0') {
        report = `${report}`;
        ans.unshift(report);
    }
    ans = ans.join('');
    ans = ans.replace(/(\.[0]*$)|((?<=\..*)0*$)|(^[0]*)(?=.\..*)|(^0*)/g, '');
    return ans;
}
