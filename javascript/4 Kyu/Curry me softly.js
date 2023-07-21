// second attempts: accumulate the arguments and execute only once when called without args
function CurryIt(func) {
    let outerParameters = [];
    let self = null;
    function curried(...localParameters) {
        if (self === null) {
            self = this;
        }
        outerParameters = [...outerParameters, ...localParameters];
        if (localParameters.length === 0) {
            const res = func.call(self, ...outerParameters);
            outerParameters = [];
            return res;
        }
        return curried;
    }
    return curried;
}

// First attempt: try to execute everything on the fly
// function CurryIt(func) {
//   // keep track of the value
//   let x = 0;
//   let self = undefined;
//   let args = [];
//
//   function y(a) {
//     if (typeof(self) === "undefined") {
//       self = this;
//     }
//     // if invoked without argument reset
//     if (typeof(a) === "undefined") {
//       let bob = x;
//       x = 0;
//       self = undefined;
//       console.log(bob);
//       console.log("=== RESET ===")
//       return bob;
//     }
//
//     // use the first argument only
//     if(typeof(arguments[0]) == "function"){
//       console.log("FONCTION MA GUEULE");
//     }
//     console.log(arguments[0])
//     x += func.call(self, arguments[0]);
//
//     // call the function until there isn't any argument
//     let john = [...arguments];
//     john.shift();
//     john.forEach(n => y(n));
//   }
//   return y;
// }