import {SerialPort} from 'serialport';

const path = "COM3"
const port = new SerialPort({path, baudRate: 9600});

const speed = 10;
const LEFT = 0;
const RIGHT = 1;
const SEITEN = 0;
const HANTEN = 1;


let moterType = RIGHT;
let direction = SEITEN;

// setInterval(()=>{
//     moterType = 1 - moterType
//     console.log(moterType)
// },100);



const data = Buffer.from([speed << 2 | 0 << 1 | direction])
const data1 = Buffer.from([speed << 2| 1 << 1 | direction])
// const data = (speed << 2) | (moterType << 1) | direction
// const data = `${String.fromCharCode(speed)}${String.fromCharCode(moterType)}${String.fromCharCode(direction)}`;
// const data1 = data.toString()
// const data = Buffer.from([speed, moterType, direction]);

let flag = true


const run=()=>{
    port.write(data, function(err){
        if(err){
            return console.log('送信失敗',err.message);
        }
        console.log("送信成功");
    })
}

const run1 =()=>{
    port.write(data1, function(err){
        if(err){
            return console.log('送信失敗',err.message);
        }
        console.log("送信成功");
    })
}
console.log("data",data)

port.on('open', function() {
    console.log('ポートが開いた');

    
    // setInterval(()=>{
    
    
    //     port.write(data, function(err){
    //         if(err){
    //             return console.log('送信失敗',err.message);
    //         }
    //         console.log("送信成功");
    //     })
    
    
    // },1000)

    setInterval(()=>{
        run()
        run1()
    },1000)
    
   
    let text = ''

    // port.on('data', function(data) {
    //     text += String(data);
    //     // console.log("textの内容")
    //     if (String(data).endsWith('\n')) {
    //         console.log("textの内容：",text);
    //         text = '';
    //     }
    // });
    port.on("data", function(data){
        text += String(data);
        String(data).endsWith('\n') && console.log(text);
    })
});