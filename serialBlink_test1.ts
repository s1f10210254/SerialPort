import { SerialPort, ReadlineParser } from "serialport";

const path = "COM4";
const port = new SerialPort({path, baudRate: 57600});
const parser = new ReadlineParser();

const identifierCode = 0x90;
const upperByteValues = [...Array(128).keys()];
const lowerByteValues = [...Array(128).keys()];

const delayBetweenWrites = 10; // 送信間隔を100ミリ秒に設定

console.log(Buffer.from([identifierCode]));

port.on('open', () => {
    console.log('Arduino connected');

    let upperIndex = 0;
    let lowerIndex = 0;

    function sendNextData() {
        if (upperIndex >= upperByteValues.length) return;

        const upperByte = upperByteValues[upperIndex];
        const lowerByte = lowerByteValues[lowerIndex];

        const buffer = Buffer.from([identifierCode, upperByte, lowerByte]);
        port.write(buffer, (err) => {
            if (err) {
                return console.error('Error writing to port: ', err.message);
            }
            console.log(`Sent: 0x${identifierCode.toString(16)} 0x${upperByte.toString(16)} 0x${lowerByte.toString(16)}`);

            // 次のデータへ進む
            if (lowerIndex + 1 < lowerByteValues.length) {
                lowerIndex++;
            } else if (upperIndex + 1 < upperByteValues.length) {
                upperIndex++;
                lowerIndex = 0;
            }

            setTimeout(sendNextData, delayBetweenWrites); // 次のデータ送信をスケジュールする
        });
    }

    sendNextData();
});

parser.on('data', (data) => {
    console.log(`Received: ${data}`);
});

port.on('error', (err) => {
    console.error('Error: ', err);
});
