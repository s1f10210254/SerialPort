import { send } from "process";
import { SerialPort } from "serialport";


const path = "COM4"

const port = new SerialPort({path, baudRate:57600});

function sendDigitalMessage(pin: number, value: number){
    const command = value === 1 ? 0x90 : 0x80;
    const portNumber = pin <= 7 ? 0x90 : 0x98;
    const data = [command | (pin % 8), value];
    const message = [portNumber, ...data];

    port.write(message,(err)=>{
        if(err){
            return console.log('Error:', err.message)
        }
    console.log(`Sent: ${message.map(byte => byte.toString(16)).join(' ')}`);
    })
}

port.on('open', ()=>{
    console.log('Arduino connected');

    sendDigitalMessage(13,1)
})