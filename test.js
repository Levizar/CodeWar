const proba = [
    ['gazon', 10],
    ['shrek', 70],
    ['boris', 20]
];

const probaWithBound = [];
let totalProb = proba.reduce((acc, elm) => {
    probaWithBound.push(...elm, acc);
    return acc + elm[1];
}, 0);

const getOne = (probaWithBound, totalProb) => {
    const choosen = Math.random() * totalProb;
    return probaWithBound.reduceRigth((acc, elm) => (choosen <= elm[2] ? elm[0] : acc));
};

///// Test Curryfication function

const currier = fnToCurry => {
    const curried = ({ fun, args, prevArgs }) => {
        if (fun.length <= args.length + prevArgs.length) {
            return fun(...prevArgs, ...args);
        } else {
            return (...nextArgs) => curried({ args: nextArgs, prevArgs: [...prevArgs, ...args], fun });
        }
    };
    return (...args) =>
        curried({
            fun: fnToCurry,
            args: args,
            prevArgs: []
        });
};

const CurryIt = fun => {
    const curried = (...args1) => {
        const fn = (...args2) => fun(...args1, ...args2);
        fn.valueOf = () => fun(...args1);
        return fn;
    };
};

function CurryIt(func) {
    let fn = func;
    let that;

    return function(...args) {
        if (!that) that = this;

        if (args.length === 0) {
            const result = fn();
            fn = func;
            return result;
        }

        fn = fn.bind(that, ...args);
    };
}

const memo = fun => {
    const args = [];
    const f = fun;
    return (...nextArgs) => {
        args = [...args, ...nextArgs];
        if (nextArgs.length === 0) return fun(...args);
    };
};

const add = (...args) => args.reduce((acc, item) => acc + item, 0);

  