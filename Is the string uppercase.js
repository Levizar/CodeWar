String.prototype.isUpperCase = function () {
  return (!(/[^A-Z]/.test(String)));
}

// Arrow function don't have a "this" and can't be use to define method !