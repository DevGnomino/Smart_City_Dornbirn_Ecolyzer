import React, { useState, useEffect } from "react";
import { InfluxDB } from "@influxdata/influxdb-client";

const bucket = "ecolyzer";
const org = "htldor";
const token = "W5W6CaN_pYQg9BOEMJRQRYwV17fzJo-vUaJDhBZ20o_cmlr0Xeo5RjvrTZpOHpmyY9D8ayqO-sF3nBpiR6Fh9A==";
const url = "http://10.115.3.38:8086/"; //oder http://localhost:8086

let query = `from(bucket: "` + { bucket } + `")
  |> range(start: -5m)
  |> filter(fn: (r) => r["my_measurement"] == "my")
  |> filter(fn: (r) => r["_field"] == "nCars")
  |> filter(fn: (r) => r["_field"] == "nBusses")
  |> filter(fn: (r) => r["_field"] == "nBikes")
  |> aggregateWindow(every: 1m, fn: mean, createEmpty: false)
  |> yield(name: "mean")`;

export const InfluxData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        let res = [];
        const influxQuery = async () => {
            //create InfluxDB client
            const queryApi = await new InfluxDB({ url, token }).getQueryApi(org);
            //make query
            await queryApi.queryRows(query, {
                next(row, tableMeta) {

                    const o = tableMeta.toObject(row);
                    //push rows from query into an array object
                    res.push(o);
                },
                complete() {

                    let finalData = []

                    //variable is used to track if the current ID already has a key
                    var exists = false

                    //nested for loops aren't ideal, this could be optimized but gets the job done
                    for (let i = 0; i < res.length; i++) {
                        for (let j = 0; j < finalData.length; j++) {
                            //check if the sensor ID is already in the array, if true we want to add the current data point to the array
                            if (res[i]['sensor_id'] === finalData[j]['id']) {
                                exists = true

                                let point = {}
                                point["x"] = res[i]["_time"];
                                point["y"] = res[i]["_value"];
                                finalData[j]["data"].push(point)
                            }

                        }
                        //if the ID does not exist, create the key and append first data point to array
                        if (!exists) {
                            let d = {}
                            d["id"] = res[i]["sensor_id"];
                            d['data'] = []
                            let point = {}
                            point["x"] = res[i]["_time"];
                            point["y"] = res[i]["_value"];
                            d['data'].push(point)
                            finalData.push(d)
                        }
                        //need to set this back to false
                        exists = false

                    }

                    setData(finalData);

                },
                error(error) {
                    console.log("query failed- ", error);
                }
            });

        };

        influxQuery();
    }, []);

    return (
        data
  )
};