from datetime import datetime
import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS

bucket = "ecolyzer"
org = "htldor"
token = "W5W6CaN_pYQg9BOEMJRQRYwV17fzJo-vUaJDhBZ20o_cmlr0Xeo5RjvrTZpOHpmyY9D8ayqO-sF3nBpiR6Fh9A=="
url="http://10.115.3.38:8086"

client = influxdb_client.InfluxDBClient(
   url=url,
   token=token,
   org=org
)

write_api = client.write_api(write_options=SYNCHRONOUS)

#currTime = datetime.now()

latLon = "47.502069,9.747105"
allPoints = list()
allPoints.append(influxdb_client.Point("my_measurement").tag("location", latLon).field("cars", 11))
allPoints.append(influxdb_client.Point("my_measurement").tag("location", latLon).field("busses", 3))
allPoints.append(influxdb_client.Point("my_measurement").tag("location", latLon).field("bike", 2))
for point in allPoints:
    write_api.write(bucket=bucket, org=org, record=point)
