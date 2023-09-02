import {SerialPort} from 'serialport';

const path = "COM4"
const port = new SerialPort({path, baudRate: 9600});


port.on('open', function() {
    console.log('ポートが開いた');
    
    let n = 0;

    setInterval(() => {
        n = 1 - n;

        port.write(n ? '0' : '1', function(err){
            if(err){
                return console.log('送信失敗', err.message);
            }
            console.log("送信成功");
        });
    }, 1000);

    let text = ''

    port.on('data', function(data) {
        text += String(data);
        if (String(data).endsWith('\n')) {
            console.log(text);
            text = '';
        }
    });
});