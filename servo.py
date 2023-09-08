import pyfirmata
import time

# Arduinoボードのポートに合わせて変更してください
port = 'COM4'  # Windowsの場合
# port = '/dev/ttyUSB0'  # Linuxの場合

# Arduinoとの接続を確立
board = pyfirmata.Arduino(port)

# Servoモーターを接続したピンを指定（例: D9）
servo_pin = 9

# Servoオブジェクトを作成
servo = board.get_pin('d:{}:s'.format(servo_pin))

# サーボの位置を制御する関数
def set_servo_position(angle):
    angle = max(0, min(180, angle))  # 0から180の間に制限
    servo.write(angle)

try:
    while True:
        # サーボを0度から180度まで動かすサンプル
        for angle in range(0, 181, 10):
            set_servo_position(angle)
            time.sleep(0.5)  # 0.5秒待つ
        
        for angle in range(180, -1, -10):
            set_servo_position(angle)
            time.sleep(0.5)
            
except KeyboardInterrupt:
    # Ctrl+Cが押されたらプログラムを終了
    board.exit()
