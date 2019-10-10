
function wave(string){
    function waveSolo(word){
        let arr=[];
        for(let i=0;i<word.length;i++){
          let a = word.split('');
          a[i] = a[i].toUpperCase();
          a = a.join('');
          arr[i] = a;
        }
      return arr;
     }

     if(string.match(/ /gi) == null){
         return waveSolo(string);
        }
        
    else{
        let arrOfSpace=[];
        let idx= string.indexOf(" ");
        while(idx != -1){
            arrOfSpace.push(idx);
            idx = string.indexOf(" ",idx+1);
        }
        let workingString = string.replace(/ /g,"");
        let array = waveSolo(workingString);
        for (let i=0;i<array.length;i++){
            for(let j=0;j<arrOfSpace.length;j++){
                array[i]=[array[i].slice(0, arrOfSpace[j]), " ", array[i].slice(arrOfSpace[j])].join('');
            }
        }
        return array
    }
}
