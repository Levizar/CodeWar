let pwd = [...Array(40).keys()].map(x => null);

const decode = (str, from, to, by) => {
    str = [...str];
    str.forEach((item, i) => {
        pwd[from] = item;
        from += by;
    });
};

decode('5409', 0, 4, 1);
decode('46fe8b1e', 4, 20, 2);
decode('9fab2f230', 5, 30, 3);
decode('9c72960bd', 5, 40, 4);
decode('68eb56', 6, 40, 6);
decode('f', 7, 8, 1);
decode('e71f36a35d', 10, 40, 3);
decode('edf65f', 10, 40, 5);
decode('d93b7', 15, 40, 6);
decode('f2304fd', 20, 40, 3);
console.log(pwd);
console.log(pwd.join(''));
