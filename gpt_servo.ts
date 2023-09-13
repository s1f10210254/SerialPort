import { SerialPort } from "serialport";

const path = "COM4";
const port = new SerialPort({path, baudRate:57600});

const identifierCode = 0x90;
const pinNumber = 13;
const value = 1;

const servoPin = 13;

// SYSEX-related constants
const SYSEX_STAET = 0xF0;
const SYSEX_END = 0xF7;
const SERVO_CONFIG = 0x70;

// Setup servo for control
const setupServo = ()=>{
    const buffer = Buffer.from([SYSEX_STAET,SYSEX_END,SERVO_CONFIG]);
    port.write(buffer, (err)=>{
        if (err){
            return console.error('Error: ',err.message)
        }
        console.log(`Sent message to setupServo`)
    });
};

//Control servo angle
const setServoAngle = (angle: number)=>{
    const buffer = Buffer.from([0xE0 + servoPin, angle & 0x7F,(angle >> 7) & 0x7F])
    port.write(buffer, (err)=>{
        if(err){
            return console.error(`Erro:`,err.message)
        }
        console.log(`Sent message to setupServoAngle ${angle}`)
    })
}

const run = ()=>{
    //LED control
    const buffer = Buffer.from([identifierCode + (pinNumber >> 3), (1 << (pinNumber & 0x07)) * value, 0x00]);
    port.write(buffer,(err)=>{
        if (err) {
            return console.error('Error writing to port: ', err.message);
        }
        console.log(`Sent message to turn on LED at pin ${pinNumber}`);
    })

    //Servo control
    setServoAngle(90);
}

port.on('open', ()=>{
    console.log('Arduino connected');

    setupServo();
    setInterval(run, 1000);
})

port.on('error', (err)=>{
    console.error('Error: ', err)
})