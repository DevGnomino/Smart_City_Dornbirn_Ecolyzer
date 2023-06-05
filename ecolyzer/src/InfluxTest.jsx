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
    const [influxData, setInfluxData] = useState([{location:[47.421169, 9.747031]}])

    try {
        useEffect(() => {  
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
                        valueArray.push({time: values[5], location: [lat,long], name: values[7], count: values[6]});
                    }
                });
                console.log(valueArray);
                setInfluxData(valueArray);
            });
        }, [])
        
        //console.log(valueArray);
        
        //Sortiert die Werte damit der aktuellste Wert oben ist:
        /*for (let i = 0; i < valueArray.length; i++) {
            for (let j = 0; j < valueArray.length; j++) {
                if (valueArray[i].time > valueArray[j].time) {
                    let tempValue = valueArray[i];
                    valueArray[i] = valueArray[j];
                    valueArray[j] = tempValue;
                }
                else if (valueArray[i].time == valueArray[j].time && valueArray[i].name > valueArray[j].name) {
                    let tempValue = valueArray[i];
                    valueArray[i] = valueArray[j];
                    valueArray[j] = tempValue;
                }
            }
        }*/

        //setVehicleData(valueArray);
        //return {car: valueArray[0], bus: valueArray[1], bike: valueArray[2], location: valueArray[0].location}; 
        
        
        return (            
            <Marker position={influxData[0].location} icon={props.DefaultIcon}>
                <Popup>
                    <p className="font-bold">Folgende Daten sind hier vorhanden:</p>
                    <p>Autos: {influxData[1].count}<br></br>
                       Busse: {influxData[0].count}<br></br>
                       Zweiräder: {influxData[4].count}<br></br>
                       Temperatur: {influxData[3].count}<br></br>
                       Luftfeuchtigkeit: {influxData[2].count}</p>
                </Popup>
            </Marker>
        ); 
    }
    catch(ex) {
        console.log("Fetch error: " + ex);
    }
}
