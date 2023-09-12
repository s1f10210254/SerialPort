import { SerialPort } from "serialport";

const port = new SerialPort({
    path: 'COM4',
    baudRate:57600,
    autoOpen:true,
})


port.on('open', ()=>{
    console.log('Arduino connected');

    
    //Pin 13をOUTPUTモードに設定
    const pinModeMessage = Buffer.from([0xF4, 0x0D, 0x01]);
    port.write(pinModeMessage);

    setTimeout(()=>{
        let isLedOn = false;

        setInterval(()=>{
            isLedOn = !isLedOn;
            if(isLedOn){
                const ledOnMessage = Buffer.from([0x90, 0x20, 0x00]);
                port.write(ledOnMessage);
                console.log(`High`)
            }else{
                const ledOffMessage = Buffer.from([0x90, 0x00, 0x00]);
                port.write(ledOffMessage);
                console.log(`Low`)
            }
        },2000);
    },2500)

    
})

port.on('error', (err) => {
    console.error('Error: ', err);
  });