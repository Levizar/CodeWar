function rot13(message){
    let alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let index = 0;
    let answer = "";
    for (let i = 0; i < message.length; i++) {
        index = alpha.findIndex(message[i])
        if (index == -1){
            answer[i] = message [i]   
        }
        else{
            index += 13;
            index > 25 ? index =- 26 : index = index;
            answer[i] = alpha[index];
        }
    }
    return answer;
}