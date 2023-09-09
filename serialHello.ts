import { ReadlineParser, SerialPort } from "serialport";

const path = "COM4"

const port = new SerialPort({path, baudRate:57600});
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', ()=>{
    console.log("ポートが開いた");
    const dataTosend = "Hello, Arduino!\n";

    port.write(dataTosend,(err)=>{
        if(err){
            return console.log('送信失敗',err.message);
        }
        console.log("データをAruduinoに送信しました",dataTosend);
    })
})