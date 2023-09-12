import { SerialPort, ReadlineParser } from "serialport";

const path = "COM4";
const port = new SerialPort({ path, baudRate: 57600 });
const parser = new ReadlineParser();

const identifierCode = 0x90;
const upperByteValues = [...Array(128).keys()];
const lowerByteValues = [...Array(128).keys()];

console.log(Buffer.from([identifierCode]));

port.on('open', () => {
    console.log('Arduino connected');
    sendData(0, 0);
});

function sendData(upperIndex, lowerIndex) {
    if (upperIndex >= upperByteValues.length) return; // すべての送信が終了した場合

    const upperByte = upperByteValues[upperIndex];
    const lowerByte = lowerByteValues[lowerIndex];

    const buffer = Buffer.from([identifierCode, upperByte, lowerByte]);
    port.write(buffer, (err) => {
        if (err) {
            console.error('Error writing to port: ', err.message);
            return;
        }

        console.log(`Sent: 0x${identifierCode.toString(16)} 0x${upperByte.toString(16)} 0x${lowerByte.toString(16)}`);

        // 次の組み合わせへ
        if (lowerIndex + 1 < lowerByteValues.length) {
            sendData(upperIndex, lowerIndex + 1);
        } else if (upperIndex + 1 < upperByteValues.length) {
            sendData(upperIndex + 1, 0);
        }
    });
}

parser.on('data', (data) => {
    console.log(`Received: ${data}`);
});

port.on('error', (err) => {
    console.error('Error: ', err);
});
