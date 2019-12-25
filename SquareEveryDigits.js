function squareDigits(num) {
  var arr = [];
  var numstring = num.toString();
  arr = numstring.split();
  arr.map(Number);

  for (i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * arr[i];
  }

  arr.join("");
  arr = parseInt(arr);

}


console.log(squareDigits(12345));