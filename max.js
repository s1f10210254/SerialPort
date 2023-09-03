var { SerialPort } = require("serialport");
var port = new SerialPort({ path: 'COM3', baudRate: 9600 });

const commands = [
    { duration: 0, left: 1, right: 1 }, //前
    { duration: 1, left: 1, right: 0 }, //右
    { duration: 1.5, left: 1, right: 1 }, //まっすぐ
    { duration: 1, left: 1, right: 0 }, //右
    { duration: 1.5, left: 1, right: 1 }, //まっすぐ
    { duration: 1, left: 1, right: 0 }, //右
    { duration: 1.5, left: 1, right: 1 },//まっすぐ
    { duration: 1, left: 0, right: 1 }, //左
    { duration: 1.5, left: 1, right: 1 }, //まっすぐ
    { duration: 1, left: 0, right: 1 }, //左
    { duration: 1.5, left: 1, right: 1 }, //まっすぐ
    { duration: 1, left: 0, right: 1 }, //左
    { duration: 1.5, left: 1, right: 1 }, //まっすぐ
    { duration: 1, left: 1, right: 0 }, //右
    { duration: 1.5, left: 1, right: 1 }, //まっすぐ
]

port.on('open', function() {
    console.log('ポートが開いた');
    
    const fn = (n) => {
        const command = commands[n % commands.length]
        const leftSpeed = 5 * command.left << 2
        const rightSpeed = 5 * command.right << 2
        const leftMotor = 1 << 1
        const rightMotor = 0 << 1
        const leftDirection = 1
        const rightDirection = 1

        port.write(Buffer.from([leftSpeed | leftMotor | leftDirection]), function(err){
            if(err){
                return console.log('left送信失敗', err.message);
            }
            console.log("left送信成功");
        });

        port.write(Buffer.from([rightSpeed | rightMotor | rightDirection]), function(err){
            if(err){
                return console.log('right送信失敗', err.message);
            }
            console.log("right送信成功");
        });

        setTimeout(() => fn(n + 1), command.duration * 1000)
        // setTimeout(()=>{
        //     fn(n+1);
        // },command.duration * 1000)
    }

    fn(0)

    var text = ''

    port.on('data', function(data) {
        text += String(data);
        if (String(data).endsWith('\n')) {
            console.log(text);
            text = '';
        }
    });
});