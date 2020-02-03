// Not posted

function curry(fun, ...args) {
  return function (...arg2) {
    return fun.call(this, ...args, ...arg2);
  }
}