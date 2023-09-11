import { SerialPort, ReadlineParser } from "serialport";
import { buffer } from "stream/consumers";



const path = "COM4"

const port = new SerialPort({path, baudRate:57600});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n'}));

const identifierCode = 0x9D;
const upperByteValues = [...Array(128).keys()]; // 0から127の上位バイトの値
const lowerByteValues = [0x00, 0x01]; // 下位バイトの値

console.log(Buffer.from([identifierCode]))

port.on('open', () => {
    console.log('Arduino connected');
  
    upperByteValues.forEach((upperByte) => {
      lowerByteValues.forEach((lowerByte) => {
        // 上位バイトと下位バイトを送信
        const buffer = Buffer.from([identifierCode, upperByte, lowerByte]);
        port.write(buffer, (err) => {
          if (err) {
            return console.error('Error writing to port: ', err.message);
          }
          console.log(`Sent: 0x${identifierCode.toString(16)} 0x${upperByte.toString(16)} 0x${lowerByte.toString(16)}`);
        });
      });
    });
  });
  
  parser.on('data', (data) => {
    console.log(`Received: ${data}`);
  });
  
  port.on('error', (err) => {
    console.error('Error: ', err);
  });