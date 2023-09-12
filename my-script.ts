import {SerialPort} from 'serialport';
import { ReadlineParser } from 'serialport';
import * as readline from 'readline';


const path = 'COM4'; // Arduinoのシリアルポートを指定してください
// const baudRate = 57600; // Arduinoとの通信速度に合わせて変更してください


const serialPort = new SerialPort({path, baudRate:57600})



const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Arduino Control> ',
});

// Arduinoからのデータを受信した際の処理
serialPort.on('data', (data) => {
  console.log(`Arduinoからのデータ: ${data.toString()}`);
});

// コマンドをArduinoに送信する関数
function sendCommand(command: string) {
  serialPort.write(`${command}\n`, (err) => {
    if (err) {
      console.error('エラー:', err);
    } else {
      console.log(`コマンドを送信: ${command}`);
    }
  });
}

// シリアルポートを開いた際の処理
serialPort.on('open', () => {
  console.log(`Arduinoに接続しました: ${path}`);
  rl.prompt();

  rl.on('line', (input) => {
    if (input.trim() === 'exit') {
      serialPort.close();
      rl.close();
    } else {
      sendCommand(input);
      rl.prompt();
    }
  }).on('close', () => {
    console.log('プログラムを終了します。');
    process.exit(0);
  });
});

// シリアルポートのエラー処理
serialPort.on('error', (err) => {
  console.error('シリアルポートのエラー:', err);
});

