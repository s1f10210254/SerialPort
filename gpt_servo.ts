import { resolve } from "path";
import { SerialPort,ReadlineParser } from "serialport";

const path = 'COM4';
const port = new SerialPort({path, baudRate:57600});
const parser = new ReadlineParser();

const SERVO_CONFIG = 0x70;

const servoPin = 9;

function setServoAngle(pin:number, angle:number){
    //アナログメッセージを使用してサーボ角度を設定
    const buffer = Buffer.from([0xE0 + pin, angle & 0x7F, angle >> 7]);
    port.write(buffer,(err)=>{
        if(err){
            return console.error('Error writing to port: ', err.message)
        }
        console.log(`Sent ${pin}pin Servo ${angle}`)
    });
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

port.on('open', async()=>{
    console.log('Arduino connected');

    let buffer = Buffer.from([SERVO_CONFIG, servoPin, 0x00, 0x00]);
    port.write(buffer);
    await delay(50);
    setInterval(async()=>{
        setServoAngle(servoPin, 90);
        await delay(50)
    },1000)
})



parser.on('data', (data) =>{
    console.log(`Received: ${data}`)
})

port.on('error', (err)=>{
    console.log('Error: ', err)
})