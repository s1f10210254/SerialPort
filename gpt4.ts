import { SerialPort } from "serialport";

// const path = "COM4"
// const port = new SerialPort(path, { baudRate:57600 });
const port = new SerialPort({
    path: 'COM4',
    baudRate: 57600,
    autoOpen: true,
})

// Firmataのバイト列
const setPinToOutput = [0xF4, 0x0D, 0x01];
const setPinHigh = [0x90, 0x20, 0x00];
const setPinLow = [0x90, 0x00, 0x00];

// 初期設定（ピンを出力に設定）
port.write(Buffer.from(setPinToOutput), (err) => {
  if (err){ 
    return console.error("Error setting pin mode:", err.message);
    }
  console.log(`Sent Output 0x${setPinToOutput} `)
});

// LEDの点滅（Lチカ）を行う
setInterval(() => {
  // LEDの状態取得（条件演算子、三項演算子）
  const ledState = port.isOpen ? setPinLow : setPinHigh;

  // LEDのオン・オフを切り替える
  port.write(Buffer.from(ledState), err => {
    if (err) {return console.error("Error writing to port:", err.message);}
    console.log(`sent LED ${port.isOpen ? 'LOW:' + setPinLow : 'HIGH' + setPinHigh}`)
  });
}, 1000); // 切り替え間隔（ミリ秒）

port.on('error', err => {
  console.error('Error: ', err.message);
});