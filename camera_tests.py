from picamera import PiCamera
from time import sleep

camera = PiCamera()
camera.rotation = 180

camera.capture("./testpic.jpg")
#camera.start_preview()
#sleep(60)
#camera.stop_preview()