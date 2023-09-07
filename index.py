import pyfirmata
import time

# Arduinoボードとのシリアル通信を確立
board = pyfirmata.Arduino('COM4')  # 'COMX'をArduinoのシリアルポートに置き換えてください

# デジタルピン13を出力モードに設定
led_pin = board.get_pin('d:13:o')

# メインループ
while True:
    # ピンをHIGHに設定し、LEDを点灯
    led_pin.write(1)
    time.sleep(1)

    # ピンをLOWに設定し、LEDを消灯
    led_pin.write(0)
    time.sleep(1)
