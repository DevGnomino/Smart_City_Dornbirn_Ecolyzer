# Import libraries
from PIL import Image
import numpy as np
import cv2
import requests

#image = Image.open(requests.get('https://a57.foxnews.com/media.foxbusiness.com/BrightCove/854081161001/201805/2879/931/524/854081161001_5782482890001_5782477388001-vs.jpg', stream=True).raw)
#image = image.resize((450,250))
#image_arr = np.array(image)

carDetector = cv2.CascadeClassifier('cas4.xml')

#img = cv2.imread('test.jpg')
image = Image.open(requests.get('https://a57.foxnews.com/media.foxbusiness.com/BrightCove/854081161001/201805/2879/931/524/854081161001_5782482890001_5782477388001-vs.jpg', stream=True).raw)
img = np.array(image)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
faces = carDetector.detectMultiScale(gray, 1.3, 5)
#faces = carDetector.detectMultiScale(gray, scaleFactor=1.05,minNeighbors=5,minSize=(30, 30), flags=cv2.CASCADE_SCALE_IMAGE)
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

cv2.imshow('img', img)
cv2.waitKey(0)

