import { SerialPort  } from "serialport";
const port = new SerialPort({ path: 'COM4', baudRate:9600});

const message = 1;
const data = Buffer.from([message]);
console.log(data);

const run =()=>{
    port.write(data, function(err){
        if(err){
            return console.log('送信失敗',err.message);
        }
        console.log("送信成功");
    })
}
port.on('open',function(){
    console.log("ポートが開いた");

    setInterval(()=>{
        run();
        
    },1000)

    // setTimeout(()=>{
    //     run();
    // },1000)

    let text = '';
    port.on("data", function(data){
        text += String(data);
        if(String(data).endsWith('\n')){
            console.log(text);
            text = '';
        }
    })

})