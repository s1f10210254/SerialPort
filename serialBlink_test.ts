import { SerialPort } from "serialport";


const path = "COM4"

const port = new SerialPort({path, baudRate:57600});

port.on('open', () => {
    console.log('Arduino connected');
  
    // 上位1バイト（種別コード）の全通りを送信
    for (let command = 0x90; command <= 0x9F; command++) {
      sendDigitalMessage(13, command, 1); // 下位1バイトを1（ON）で固定
      sendDigitalMessage(13, command, 0); // 下位1バイトを0（OFF）で固定
    }
  });
  
  function sendDigitalMessage(pin: number, command: number, value: number) {
    const data = [command, value];
    port.write(data, (err) => {
      if (err) {
        return console.log('Error:', err.message);
      }
      console.log(`Sent to pin ${pin}, command ${command.toString(16)}: ${data.map(byte => byte.toString(16)).join(' ')}`);
    });
  }