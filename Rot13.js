// Rot13 is a code algorithm working with a rotation
function rot13(message){
    const x = 13; // Number of rotation
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    alpha = [...alpha];
    let code = [...alpha];
    
    for(let i = 0; i < x; i++){
        const rotate = code.shift();
        code.push(rotate);
    }
    alpha = [...alpha, ...alpha.map(elm => elm.toLowerCase())];
    code = [...code, ...code.map(elm => elm.toLowerCase())];
    
    let CodedMessage = [...message].map( elm => code[alpha.indexOf(elm)] ? code[alpha.indexOf(elm)] : elm);
    CodedMessage = CodedMessage.join('');
    return CodedMessage
}