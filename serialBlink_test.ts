import { SerialPort } from "serialport";


const path = "COM4"

const port = new SerialPort({path, baudRate:57600});

function sendDigitalMessage(pin: number, value:number){
    const command = 0x9D;

    const data = [command, value];

    port.write(data,(err)=>{
        if(err){
            return console.log('Error:', err.message);
        }
        console.log(`Sent to pin ${pin}: ${data.map(byte => byte.toString(16)).join(' ')}`)
    })
}

port.on('open', ()=>{
    console.log('Arduino connected');

    for (let value = 0; value <= 1; value++){
        sendDigitalMessage(13,value)
    }
})