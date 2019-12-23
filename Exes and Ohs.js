function XO(str) {
    const string = str.toUpperCase();
    arrXmatch = string.match(/[X]/g);
    arrOmatch = string.match(/[O]/g);
    // If array.match() == null => can't use length on it
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