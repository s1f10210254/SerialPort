import { SerialPort } from "serialport";
import { setInterval } from "timers";

const path = "COM4";
const port = new SerialPort({path, baudRate: 57600});

const identifierCode = 0x90;  // Digital I/O message for pins 0-6
const pinNumber = 13;  // LED is connected to pin 13
const value = 1;  // HIGH

const run = ()=>{
        // Create the message
        const buffer = Buffer.from([identifierCode + (pinNumber >> 3), (1 << (pinNumber & 0x07)) * value, 0x00]);
    
        // Send the message to turn on the LED
        port.write(buffer, (err) => {
            if (err) {
                return console.error('Error writing to port: ', err.message);
            }
            console.log(`Sent message to turn on LED at pin ${pinNumber}`);
        });
}

port.on('open', () => {
    console.log('Arduino connected');
    setInterval(run,1000)

});

port.on('error', (err) => {
    console.error('Error: ', err);
});
