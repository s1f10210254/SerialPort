import { SerialPort } from "serialport";
const path = 'COM4';
const port = new SerialPort({path, baudRate: 57600});

const identifierCode = 0x90;
const pinNumber = 13;
let isOn = false;

const run = ()=>{
    isOn = !isOn;

    // Depending on the state, create the appropriate message
    const bufferValue = isOn ? (1 << (pinNumber & 0x07)) : 0x00;
    const buffer = Buffer.from([identifierCode + (pinNumber >> 3), bufferValue, 0x00]);

    // Send the message
    port.write(buffer, (err) => {
        if (err) {
            return console.error('Error writing to port: ', err.message);
        }
        console.log(`Sent message to turn ${isOn ? 'on' : 'off'} LED at pin ${pinNumber}`);
    });
}

port.on('open', ()=>{
    console.log('Arduino connected');
    setInterval(run, 1000);
})

port.on('error', (err)=>{
    console.error('Error', err)
})