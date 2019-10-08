function expandedForm(num) {
    let len = num.toString().length;
    let answer = ""
    let zero = "0";
    len = parseInt(len);
    let div = "";
    div = parseInt(div);
    let divmat=[];
    let i = 0
    while(i=0;num>0;i++){
      div = "1" + "0".repeat(len-1-i);
      divmat[i] = Math.trunc(num/div);
      num = num - divmat[i];
      }
    
    while(i=0;i<divmat[i];i++){
        if (divmat[i] = 0){
          continue;
          }
        else if (i=0){
          answer = divmat[i]
        }
        else{
          answer = answer + " + " + divmat[i]
        }
      
      }
    
    return answer;
  }