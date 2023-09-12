import { SerialPort } from "serialport";

const port = new SerialPort({
    path: 'COM4',
    baudRate: 57600,
    autoOpen:true,
})

const pinNumber = 0x0d;
const setPinToOutput = [0xF4, pinNumber, 0x01];
const setPinHigh = [0x90, pinNumber, 0x01];
const setPinLow = [0x90, pinNumber, 0x00];

let isLedOn = false;

port.on('open', err => {
    if (err) {
      return console.error("Error on port open:", err.message);
    }
    port.write(Buffer.from(setPinToOutput), err =>  {
      if (err) {
        return console.error("Error setting pin mode:", err.message);
      }
      console.log(`Sent Output 0x${setPinToOutput.join(' ')}`);
  
      setInterval(() => {
        isLedOn = !isLedOn;
        const ledState = isLedOn ? setPinHigh : setPinLow;
  
        port.write(Buffer.from(ledState), err => {
          if (err) {
            return console.error("Error writing to port:", err.message);
          }
          console.log(`Sent LED ${isLedOn ? 'HIGH' : 'LOW'}`);
        });
      }, 1000); 
    });
  });
  
  port.on('error', err => {
    console.error('Error: ', err.message);
  });