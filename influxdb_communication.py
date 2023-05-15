from datetime import datetime
import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS

bucket = "ecolyzer"
org = "htldor"
token = "W5W6CaN_pYQg9BOEMJRQRYwV17fzJo-vUaJDhBZ20o_cmlr0Xeo5RjvrTZpOHpmyY9D8ayqO-sF3nBpiR6Fh9A=="
url="http://10.115.3.38:8086"

def openInfluxConnection():
   global client 
   client = influxdb_client.InfluxDBClient(
      url=url,
      token=token,
      org=org
   )

   global write_api
   write_api = client.write_api(write_options=SYNCHRONOUS)

def sendDataToInflux(latLong, nCars, nBusses, nBikes):
   print(latLong, nCars, nBusses, nBikes)
   allPoints = list()
   allPoints.append(influxdb_client.Point("my_measurement").tag("location", latLong).field("cars", nCars))
   allPoints.append(influxdb_client.Point("my_measurement").tag("location", latLong).field("busses", nBusses))
   allPoints.append(influxdb_client.Point("my_measurement").tag("location", latLong).field("bike", nBikes))
   for point in allPoints:
      write_api.write(bucket=bucket, org=org, record=point)
