const message = "前に50センチ進む"

function containsDirectPattern(str: string, pattern: string): boolean{
    return str.includes(pattern);
}

function removeNumverBeroreCentimeters(input: string):number | null{
    const regex = /(\d+)\s*センチ/g;
    const match = regex.exec(input);
    if(match){
        const numberBeforeCentimeters = parseInt(match[1],10);
        return numberBeforeCentimeters;
    }else{
        return null;
    };
};

// function speedBinari(input:number):string | null {
//     const 
// }

const extractedCentimetersWord = removeNumverBeroreCentimeters(message);
console.log("cm",extractedCentimetersWord)


let result = "00"

const inputString = message;
const forward_word = "前";
const back_word = "後";


if(containsDirectPattern(inputString, forward_word)){
    
}else if(containsDirectPattern(inputString, back_word)){
    console.log("後ろに進む")
}
