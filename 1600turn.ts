import { error } from "console";
import { SerialPort } from "serialport";

const path = 'COM4';
const port = new SerialPort({path, baudRate:57600});

const identifierCode = [...Array(256).keys()]
const upperByteValues = [...Array(256).keys()]
const lowerByteValues = [...Array(256).keys()]


port.on('open' ,()=>{
    console.log('Serial port opend');
    let setIndex = 0
    const sendNextSet = ()=>{
        for(let identifier = 0x00; identifier <= 0xFF; identifier++){
            port.write(Buffer.from([identifier]), (err)=>{
                if(err){
                    console.error('Error writing te serial port identifer',err)
                }
                console.log(`sent identifier: 0x${identifier.toString(16)}`)
                for(let upperByte = 0x00; upperByte <= 0xFF; upperByte++){
                    port.write(Buffer.from([upperByte]), (err)=>{
                        if(err){
                            console.error('Error writing to serial port upperByte',err);
                        }
                        console.log(`sent upperByte:  0x${upperByte.toString(16)}`);
    
                        for(let lowerByte = 0x00; lowerByte <= 0xFF; lowerByte){
                            port.write(Buffer.from([lowerByte]),(err)=>{
                                if(err){
                                    console.error('Error writing to serial port lowerByte', err)
                                }
                                console.log(`sent lowerByte: 0x${lowerByte.toString(16)}`)

                                setIndex++;

                                setTimeout(sendNextSet,100)
                            })
                        
                        }
                    })
                
                }
            
            })
        }
    }
    sendNextSet()
})

// port.on('open', ()=>{
//     console.log('Arduino connected');

//     let setIndex = 0;

//     //セットごとにデータを送信
//     const sendNextSet = ()=>{
//         if(setIndex < upperByteValues.length * lowerByteValues.length){
//             const upperByteIndex = Math.floor(setIndex / lowerByteValues.length);
//             const lowerByteIndex = setIndex % lowerByteValues.length;
//             const upperByte = upperByteValues[upperByteIndex];
//             const lowerByte = lowerByteValues[lowerByteIndex];

//             //セットの識別コード(0x9D)を最初に送信
//             port.write(Buffer.from([identifierCode]), (err)=>{
//                 if(err){
//                     return console.error('Error writing to port: ', err.message);
//                 }
//                 console.log(`Sent identifierCode: 0x${identifierCode.toString(16)}`);

//                 // セット内の上位バイトを送信
//                 port.write(Buffer.from([upperByte]), (err) => {
//                     if (err) {
//                         return console.error('Error writing to port: ', err.message);
//                     }
//                     console.log(`Sent upperByte: 0x${upperByte.toString(16)}`);

//                     // セット内の下位バイトを送信
//                     port.write(Buffer.from([lowerByte]), (err) => {
//                         if (err) {
//                             return console.error('Error writing to port: ', err.message);
//                         }
//                         console.log(`Sent lowerByte: 0x${lowerByte.toString(16)}`);

//                         //次のセットへ進む
//                         setIndex ++;
//                         // sendNextSet();
//                         parser.on('data', console.log)

//                         setTimeout(sendNextSet,100)
//                     });
//                 });
            
//             })
//         }
//     };
//     sendNextSet()
// })

port.on('error', (err)=>{
    console.log('Serial port error:', err);
})

port.on('close', ()=>{
    console.log('Serial port closed');
})