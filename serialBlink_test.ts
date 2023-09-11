import { SerialPort, ReadlineParser } from "serialport";



const path = "COM4"

const port = new SerialPort({path, baudRate:57600});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n'}));

port.on('open', () => {
    console.log('Arduino connected');
    sendAllCombinations();
});


function sendDigitalMessage(pin:number, value:number){
    const command = 0x9D;
    const portNumber = pin <= 7 ? 0x90 : 0x98;
    const data = [command | (pin % 8), value];
    const message = [command, ...data]

    port.write(message);
    console.log(`Sent: 0x${command.toString(16)} 0x${data[0].toString(16)} 0x${data[1].toString(16)}`);
}
   
  
function sendAllCombinations() {
    for (let upperByte = 0; upperByte <= 0x7F; upperByte++) {
      for (let lowerByte = 0; lowerByte <= 1; lowerByte++) {
        const value = (upperByte << 1) | lowerByte;
        sendDigitalMessage(13, value);
      }
    }
  }