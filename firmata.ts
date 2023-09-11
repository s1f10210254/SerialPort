// import { Board, Led } from 'firmata';

// // Arduinoに接続されているシリアルポートを指定してBoardを作成します。
// const board = new Board('COM4', () => {
//   console.log('Arduinoとの接続が確立しました。');

//   // LEDを接続したデジタルピン番号を指定してLEDオブジェクトを作成します。
//   const led = new Led(13); // 13番ピンにLEDを接続していると仮定します。

//   // 1秒ごとにLEDを点滅させる
//   setInterval(() => {
//     led.toggle(); // LEDの状態を切り替える（点滅）
//   }, 1000);
// });
