import {SerialPort} from 'serialport';

const path = "COM3"
const port = new SerialPort({path, baudRate: 9600});

const input = "MoveForword";

port.on('open', function() {
    console.log('ポートが開いた');
    
    if(input === "MoveForword"){
        port.write('1',function(err){
            if(err){
                return console.log("送信失敗", err.message);
            }
            console.log("送信成功")
        })
    }

    
    let text = ''

    port.on('data', function(data) {
        text += String(data);
        if (String(data).endsWith('\n')) {
            console.log(text);
            text = '';
        }
    });
});