# Import libraries
from PIL import Image
import cv2
import numpy as np
import requests

image = Image.open(requests.get('https://a57.foxnews.com/media.foxbusiness.com/BrightCove/854081161001/201805/2879/931/524/854081161001_5782482890001_5782477388001-vs.jpg', stream=True).raw)
image = image.resize((450,250))
image_arr = np.array(image)
image

#convert image to grayscale
grey = cv2.cvtColor(image_arr,cv2.COLOR_BGR2GRAY)
Image.fromarray(grey)

#add gaussian blur for better output
blur = cv2.GaussianBlur(grey,(5,5),0)
Image.fromarray(blur)

#dilation to fill missing parts of images whenever needed
dilated = cv2.dilate(blur,np.ones((3,3)))
Image.fromarray(dilated)

#Morphology transformation with the kernel
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
closing = cv2.morphologyEx(dilated, cv2.MORPH_CLOSE, kernel)
Image.fromarray(closing)

#detecting cars using car cascade
car_cascade_src = 'cas4.xml'
car_cascade = cv2.CascadeClassifier(car_cascade_src)
cars = car_cascade.detectMultiScale(closing, 1.1, 1)
cars

cnt = 0
for (x,y,w,h) in cars:
    cv2.rectangle(image_arr,(x,y),(x+w,y+h),(255,0,0),2)
    cnt += 1
print(cnt, " cars found")
Image.fromarray(image_arr)