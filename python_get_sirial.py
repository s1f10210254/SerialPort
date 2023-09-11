import pyfirmata
import time

# Arduinoボードとのシリアル通信を確立
board = pyfirmata.Arduino('COM4')  # 'COMX'をArduinoのシリアルポートに置き換えてください

# デジタルピン13を出力モードに設定
led_pin = board.get_pin('d:13:o')

# LちかのコードをArduinoに送信
arduino_code = "Lちかのコードをここに入力"  # Lちかのコードを指定
board.send_sysex(0x71, bytearray(arduino_code, 'utf-8'))

# メインループ
while True:
    # ここでArduinoからのシリアル通信の情報を受信し、表示
    while board.bytes_available():
        print(board.get_string())
    time.sleep(1)
