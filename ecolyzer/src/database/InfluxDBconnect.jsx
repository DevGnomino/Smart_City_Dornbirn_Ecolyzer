import { InfluxDB } from "@influxdata/influxdb-client";
import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const bucket = "ecolyzer";
const org = "htldor";
const token = "L0t7zDPuCLXMkgJC1PSIRaO1ZB1VhiSIKnO-lnludXGtEhdN3WsvQLmy5aaHBdeVKAK6STrxLupuEcEHBKHbIw==";
//Token 1:  8fkPIHpovQtjqafqg8HBadj5nA3_JTFg80vQ3UYMuxcH9BtS52OgIVvAGc68w1CjtDU8avJ8oWTPe8MRtlmgow==
//Token 2:  W5W6CaN_pYQg9BOEMJRQRYwV17fzJo-vUaJDhBZ20o_cmlr0Xeo5RjvrTZpOHpmyY9D8ayqO-sF3nBpiR6Fh9A==
const url = "http://10.115.3.38:8086"; 
    //Von zu Hause mit Tunnel: http://localhost:8086
    //In der Schule: http://10.115.3.38:8086/ 

const query = 'from(bucket: "' + bucket + '") |> range(start: -12h) |> tail(n: 30) |> movingAverage(n: 30)'; //5min

export default function InfluxMarker(props) {
    const [influxData, setInfluxData] = useState([
        { location: [47.421169, 9.747031], name: "busses", count: 0, emission: 0 },
        { location: [47.421169, 9.747031], name: "cars", count: 3, emission: 545 },
        { location: [47.421169, 9.747031], name: "humidity", count: 34.4, emission: 0 },
        { location: [47.421169, 9.747031], name: "temperature", count: 32.7, emission: 0 },
        { location: [47.421169, 9.747031], name: "twoWheelers", count: 0, emission: 0 }
    ]);


    try {
        /*useEffect(() => {  
            console.log("Get Data Function called!");

            const queryApi = new InfluxDB({url: url, token: token}).getQueryApi(org);

            //Holt die Werte aus Influx, spaltet die Zeilen und danach die einzelnen Felder auf:
            queryApi.queryRaw(query).then((result) => {
                //console.log(result);        
                const resLines = result.split('\n');
                
                let valueArray = [];
                resLines.forEach(row => {
                    if (row.length >= 2 && row[0] == ',' && row[1] == ',') {
                        let values = row.split(',');
                        //console.log(row);
                        //console.log(values[6] + " " + values[7] + " " + values[9])
                        //valueArray.push({time: values[5], location: values[9], name: values[7], count: values[6]});
                        let lat = values[9].replace('"', '');
                        let long = values[10].replace('"', '');
                        let emission = 0;
                        if (values[7] == 'cars') {
                            emission = Math.round(209.1 * values[6]); //(170 * 0.53 + 161 * 0.4)
                        }
                        else if (values[7] == 'busses') {
                            emission = Math.round(14.5 * values[6]); 
                        }
                        if(values[7]=='cars' || values[7]=='busses' || values[7]=='twoWheelers')
                            valueArray.push({location: [lat,long], name: values[7], count: Math.round(values[6]), emission: emission});
                        else
                            valueArray.push({location: [lat,long], name: values[7], count: Math.round(values[6] * 10) / 10, emission: emission});
                    }
                });
                console.log(valueArray);
                setInfluxData(valueArray);
            });
        }, [])*/
                
        return (            
            <Marker position={influxData[0].location} icon={props.DefaultIcon}>
                <Popup>
                    <p className="font-bold">Folgende Daten sind hier vorhanden:</p>
                    <p>Autos: {influxData[1].count}<br></br>
                       Busse: {influxData[0].count}<br></br>
                       Zweiräder: {influxData[4].count}<br></br>
                       Temperatur: {influxData[3].count}°<br></br>
                       Luftfeuchtigkeit: {influxData[2].count}<br></br>
                       Auto Emissionen: {influxData[1].emission} g<br></br>
                       Bus Emissionen: {influxData[0].emission} g</p>
                </Popup>
            </Marker>
        ); 
    }
    catch(ex) {
        console.log("Fetch error: " + ex);
    }
}
