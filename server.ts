const message = "前に５０センチ進む"

function containsPattern(str: string, pattern: string): boolean{
    return str.includes(pattern);
}

function removeBeroreCentimeters(input: string):string | null{
    const regex = /(\S+)\s*センチ/g;
    const match = regex.exec(input);
    if(match){
        const wordBeforeCentimeters = match[1].trim();
        return wordBeforeCentimeters;
    }else{
        return null;
    };
};

const extractedCentimetersWord = removeBeroreCentimeters(message);



let result = ""

const inputString = message;
const forward_word = "前";
const back_word = "後";
const speed_word = "センチ"

if(containsPattern(inputString, forward_word)){
    console.log("前に進む")
    if(containsPattern(inputString,speed_word)){
        
    }
}else if(containsPattern(inputString, back_word)){
    console.log("後ろに進む")
}
