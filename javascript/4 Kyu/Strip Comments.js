// Thx to StackOverflow
// https://stackoverflow.com/questions/4029109/javascript-regex-how-to-put-a-variable-inside-a-regular-expression
// var regex = new RegExp("ReGeX" + testVar + "ReGeX");
// ...
// string.replace(regex, "replacement");

// Liste of char that need to be escaped in regex
// \^$.|?*+()[{
function solution(input, markers) {
    let str = input;
    for (let i = 0; i < markers.length; i++) {
        let specialChar = markers[i];
        if (/\\\^\$\.\|\?\*\+\(\)\[\{/.test(specialChar)) specialChar = '\\' + specialChar;
        const regex = new RegExp(` (?=[${specialChar}]).*`, 'gm');
        str = str.replace(regex, '');
    }
    return str;
}
