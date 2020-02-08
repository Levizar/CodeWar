// device.encode ('')

let letter = "abcdefghijklmnopqrstuvwxyz";
letter = letter.toUpperCase() + letter + "?,. "
device.decode = sentence => {
    let dictionary = {};
    for (let i = 0; i < letter.length; ++i) {
        let toEncrypt = "";
        for (let j = 0; j < sentence.length; ++j) {
            toEncrypt += letter[i];
        }
        const encrypted = device.decode(toEncrypt);
        

    }
}