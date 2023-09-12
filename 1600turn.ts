import { error } from "console";
import { SerialPort } from "serialport";

const path = 'COM4'
const port = new SerialPort({path, baudRate:57600});

const sendCustomData = (identifier: number, upperByte:number, lowerByte:number)=>{
    const buffer = Buffer.from([identifier,upperByte,lowerByte]);
    port.write(buffer,(err)=>{
        if(err){
            console.error('Error writing to serial prot:', err);
        }else{
            console.log(`sent: 0x${identifier.toString(16)} 0x${upperByte.toString(16)} 0x${lowerByte.toString(16)}`);
        }
    })
};

port.on('open' ,()=>{
    console.log('Serial port opend');

    for(let identifier = 0x00; identifier <= 0x8F; identifier++){
        for(let upperByte = 0x00; upperByte <= 0x8F; upperByte++){
            for(let lowerByte = 0x00; lowerByte <= 0x8F; lowerByte++){
                sendCustomData(identifier, upperByte, lowerByte);
            }
        }
    }
})

port.on('error', (err)=>{
    console.log('Serial port error:', err);
})

port.on('close', ()=>{
    console.log('Serial port closed');
})