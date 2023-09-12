import { SerialPort } from "serialport";

const path = 'COM4';
const port = new SerialPort({path,  baudRate: 57600 });

const identifierValue = [...Array(256).keys()];
const upperByteValues = [...Array(256).keys()];
const lowerByteValues = [...Array(256).keys()];

port.on('open', () => {
    console.log('Arduino connected');

    let setIndex = 0;

    const sendNextSet = () => {
        if (setIndex < upperByteValues.length * lowerByteValues.length) {
            const upperByteIndex = Math.floor(setIndex / lowerByteValues.length);
            const lowerByteIndex = setIndex % lowerByteValues.length;
            const upperByte = upperByteValues[upperByteIndex];
            const lowerByte = lowerByteValues[lowerByteIndex];

            // セット内の識別コードを送信
            port.write(Buffer.from([identifierValue[setIndex]]), (err) => {
                if (err) {
                    return console.error('Error writing to port: ', err.message);
                }
                console.log(`Sent identifierValue: 0x${identifierValue[setIndex].toString(16)}`);

                // セット内の上位バイトを送信
                port.write(Buffer.from([upperByte]), (err) => {
                    if (err) {
                        return console.error('Error writing to port: ', err.message);
                    }
                    console.log(`Sent upperByte: 0x${upperByte.toString(16)}`);

                    // セット内の下位バイトを送信
                    port.write(Buffer.from([lowerByte]), (err) => {
                        if (err) {
                            return console.error('Error writing to port: ', err.message);
                        }
                        console.log(`Sent lowerByte: 0x${lowerByte.toString(16)}`);

                        // 次のセットへ進む
                        setIndex++;
                        setTimeout(sendNextSet, 100);
                    });
                });
            });
        }
    };
    sendNextSet();
});

port.on('error', (err) => {
    console.log('Serial port error:', err);
});

port.on('close', () => {
    console.log('Serial port closed');
});
