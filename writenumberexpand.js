function expandedForm(num) {
  let len = num.toString().length;
  len = parseInt(len);
  let zero = "0";
  let div = "1" + "0".repeat(len - 1);


  return div;
}