import { InfluxDB } from "@influxdata/influxdb-client";

const bucket = "ecolyzer";
const org = "htldor";
const token = "8fkPIHpovQtjqafqg8HBadj5nA3_JTFg80vQ3UYMuxcH9BtS52OgIVvAGc68w1CjtDU8avJ8oWTPe8MRtlmgow==";
//Token 1:  8fkPIHpovQtjqafqg8HBadj5nA3_JTFg80vQ3UYMuxcH9BtS52OgIVvAGc68w1CjtDU8avJ8oWTPe8MRtlmgow==
//Token 2:  W5W6CaN_pYQg9BOEMJRQRYwV17fzJo-vUaJDhBZ20o_cmlr0Xeo5RjvrTZpOHpmyY9D8ayqO-sF3nBpiR6Fh9A==
const url = "http://localhost:8086"; 
    //Von zu Hause mit Tunnel: http://localhost:8086
    //In der Schule: http://10.115.3.38:8086/ 

const query = 'from(bucket: "' + bucket + '") |> range(start: -30d)';

export default async function GetInfluxData() {
    console.log("Get Data Function called!");
    try {
        const queryApi = new InfluxDB({url: url, token: token}).getQueryApi(org);

        //Holt die Werte aus Influx, spaltet die Zeilen und danach die einzelnen Felder auf:
        const result = await queryApi.queryRaw(query);
        const resLines = result.split('\n');
        resLines.pop();
        resLines.pop();
        //console.log(resLines);
        let valueArray = [];
        let lineCount = 0;
        resLines.forEach(row => {
            if (lineCount >= 4) {
                //console.log(row);
                let values = row.split(',');
                //console.log(values[6] + " " + values[7] + " " + values[9])
                valueArray.push({time: values[5], location: values[9], name: values[7], count: values[6]});
            }
            lineCount++;
        });
        
        //Sortiert die Werte damit der aktuellste Wert oben ist:
        for (let i = 0; i < valueArray.length; i++) {
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
        }

        console.log(valueArray[0]);
        console.log(valueArray[1]);
        console.log(valueArray[2]);

        return {car: valueArray[0], bus: valueArray[1], bike: valueArray[2], location: valueArray[0].location};        
    }
    catch(ex) {
        console.log("Fetch error: " + ex);
    }
}
