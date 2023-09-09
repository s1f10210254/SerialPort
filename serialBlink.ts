import { ReadlineParser, SerialPort } from "serialport";

const path = "COM4"

const port = new SerialPort({path, baudRate:57600});
const parser = port.pipe(new ReadlineParser({ delimiter: '\n'}));

let isLedOn = false;

const toggleLED = () =>{
    isLedOn = !isLedOn;

    //LEDの状態に合わせてデータを送信
    const data = Buffer.from([isLedOn ? 1:0]);
    port.write(data, (err)=>{
        if(err){
            return console.log('送信失敗',err.message);
        }
        console.log(`LEDを${isLedOn ? '点灯' : '消灯'}しました`)
    })
}


// port.on("open", ()=>{
//     console.log('ポートが開いた');


//     // デジタルピンの設定(デジタルピン13をOUTPUTに設定)
//     port.write("o 13 1\n",(err)=>{
//         if(err){
//             return console.log("送信失敗",err.message);
//         }
//         console.log('デジタルピン13をOUTPUTに設定しました');

//         // Lちか
//         setInterval(()=>{
//             port.write('d 13 1\n', (err)=>{
//                 if(err){
//                     return console.log('デジタルピン操作エラー',err.message);
//                 }
//             });

//             // 1秒後にデジタルピン13をLOWに設定
//             setTimeout(()=>{
//                 port.write('d 13 0\n',(err)=>{
//                     if(err){
//                         return console.log('デジタルピン操作エラー', err.message);
//                     }
//                 })
//             },1000);
//         },2000); //2秒ごとにLちか
//     });
// });

port.on('open',()=>{
    console.log('ポートが開いた');

    toggleLED();
    
    setInterval(toggleLED, 5000);
})

// parser.on('data', (data)=>{
//     console.log('Arduinoからのデータ受信', data);
// })

// port.on('error', (err)=>{
//     console.log('エラー:',err);
// })
