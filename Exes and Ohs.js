function XO(str) {
    const string = str.toUpperCase();
    let arrXmatch, arrOmatch = [];
    arrXmatch = string.match(/[X]/g);
    arrOmatch = string.match(/[O]/g);
    
    if(arrOmatch === null || arrXmatch === null){
      if(arrOmatch === null && arrXmatch === null){
          return true  
      } else {
          return false
      }
    } else{
        if(arrOmatch.length == arrXmatch.length){
            return true 
        } else{
            return false;
    
        }
    }
}