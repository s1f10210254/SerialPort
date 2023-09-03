import { time } from 'console';
import {SerialPort} from 'serialport';

const path = "COM3"
const port = new SerialPort({path, baudRate: 9600});

const speed = 5;
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



// const data = Buffer.from([speed << 2 | 0 << 1 | direction])
// const data1 = Buffer.from([speed << 2| 1 << 1 | direction])
// const data = (speed << 2) | (moterType << 1) | direction
// const data = `${String.fromCharCode(speed)}${String.fromCharCode(moterType)}${String.fromCharCode(direction)}`;
// const data1 = data.toString()
// const data = Buffer.from([speed, moterType, direction]);

let flag = true


const run=()=>{
    const data = Buffer.from([speed << 2 | 0 << 1 | direction])

    port.write(data, function(err){
        if(err){
            return console.log('送信失敗',err.message);
        }
        console.log("run送信成功");
    })
}

const run1 =()=>{
    const data = Buffer.from([speed << 2| 1 << 1 | direction])
    port.write(data, function(err){
        if(err){
            return console.log('送信失敗',err.message);
        }
        console.log("run1送信成功");
    })
}

const stop = ()=>{
    const data = Buffer.from([speed << 0 | 0 << 1 | direction])

}
const turnRight = ()=>{
    const data = Buffer.from([speed << 2 | 1 << 1 | direction] )
    port.write(data, function(err){
        if(err){
            return console.log('送信失敗',err.message);
        }
        console.log("turnRight送信成功");
    })
}
// console.log("data",data)
// console.log("data1",data1);

let counter = 0;
port.on('open', function() {
    console.log('ポートが開いた');

    
    // setInterval(()=>{
    //     run();
    //     run1()
    // },1000)

    // setTimeout(()=>{
    //     run();
    //     run1();
    // },1000)
    

    

    // const timerID = setInterval(()=>{
    //     if(++ counter < 10){
    //     // run();
    //     // run1();
    //     }
    //     if(++counter >= 10 ){
    //         turnRight()
    //         // clearInterval(timerID)
    //     }
    //     // run()
    //     // run1()
    // },1000)

    // const timerID1 = setInterval(()=>{
    //     run();
    //     run1();
    //     if(++counter >=100){
    //         clearInterval(timerID1)
    //         const timerID2 = setInterval(()=>{
    //             turnRight();
    //             if(++ counter >= 800){
    //                 clearInterval(timerID2)
    //             }
    //         })
    //     }
    // },1);

    // const timerID2 = setInterval(()=>{
    //     turnRight();
    //     if(++counter >=80){
    //         clearInterval(timerID2);
    //     }
    // },1000)


    
    // function startFunctions(){
    //     let currentTime = 0;

    //     let interval = setInterval(()=>{
    //         if(currentTime >= 0 && currentTime < 200){
    //             run();
    //             run1();
    //             console.log("前に進む")
    //         }else if(currentTime >= 200 && currentTime < 500){
    //             turnRight();
    //             console.log("右に回る");
    //         }else if(currentTime >= 500 && currentTime < 700){
    //             run();
    //             run1();
    //             console.log("前に進む")
    //         }

    //         currentTime += 100;
    //         if(currentTime >= 700){
    //             clearInterval(interval);
    //         }
    //     },1000);
    // }
    

    

    
   
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