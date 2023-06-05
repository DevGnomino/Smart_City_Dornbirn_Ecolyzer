# Import libraries
from PIL import Image
import numpy as np
import cv2
import requests
import time
import influxdb_communication as influxWrapper
from picamera import PiCamera

# Set up camera
# CAMERA HAS TO BE ENABLED!!!!!
camera = PiCamera()
camera.rotation = 180

# Set up cascade classifier
detector = cv2.CascadeClassifier('haar_cascade/' + vehicleType)

#FUNCTIONS:

def takePicture():
    camera.capture('./pic.jpg')
# camera.start_preview()
# sleep(60)

def preprocessImage():
    #img = cv2.imread('test.jpg')
    image = Image.open(requests.get('./pic.jpg')
    #image = image.resize((450,250))
    global img_arr
    img_arr = np.array(image)

    #convert to grayscale
    global gray
    gray = cv2.cvtColor(img_arr, cv2.COLOR_BGR2GRAY)

    #add gaussian blur for better output
    blur = cv2.GaussianBlur(gray,(5,5),0)
    Image.fromarray(blur)

    #dilation to fill missing parts of images whenever needed
    dilated = cv2.dilate(blur,np.ones((3,3)))
    Image.fromarray(dilated)

    #Morphology transformation with the kernel
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
    closing = cv2.morphologyEx(dilated, cv2.MORPH_CLOSE, kernel)
    Image.fromarray(closing)


def recogniseVehicle(vehicleType):
    counter = 0
    vehicles = detector.detectMultiScale(gray, scaleFactor=1.05,minNeighbors=5,minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)
    for (x, y, w, h) in vehicles:
        cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
        # cv2.rectangle(image_arr,(x,y),(x+w,y+h),(255,0,0),2)
        counter+=1

    print(len(vehicles))
    cv2.imshow('img', img)
    cv2.waitKey(0)

    return len(vehicles)


# MAIN PROGRAM:

if __name__ == "__main__":
    while True:
        takePicture()
        preprocessImage()
        nCars = recogniseVehicle('cars.xml')
        nBusses = recogniseVehicle('busses_front.xml')
        nTwoWheelers = recogniseVehicle('two_wheeler.xml')
        #influxWrapper.openInfluxConnection()
        latLong = "47.502069,9.747105"
        #influxWrapper.sendDataToInflux(latLong, nCars, nBusses, nTwoWheelers)
        print(latLong, nCars, nBusses, nTwoWheelers)
        time.sleep(2)
    