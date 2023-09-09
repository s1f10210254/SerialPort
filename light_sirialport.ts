import { SerialPort } from "serialport";

const path = 'COM4'
const port = new SerialPort({path, baudRate:57600});

const run = () =>{

    const data = Buffer.from([11111111])
    port.write(data,function(err){
        if(err){
            return console.log('送信失敗', err.message);
        }
        console.log("run送信成功");
    })
}

port.on('open', function(){
    console.log('ポートが開いた');

    let n = 0;

    setInterval(() =>{
        run();
    })
})