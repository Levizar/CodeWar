function expandedForm(num) {
    let len = num.toString().length;
    let div = "";
    let divmat = [];
    let i = 0;
    while (num > 0) {
        div = "1" + "0".repeat(len - 1);
        div = parseInt(div);
        divmat[i] = Math.trunc(num / div) * div;
        num = num - divmat[i];
        len = len - 1;
        i++;
    }
    let answer = [];
    answer = divmat.filter(x => parseInt(x) > 0);
    answer = answer.join(" + ");
    return answer;
}
