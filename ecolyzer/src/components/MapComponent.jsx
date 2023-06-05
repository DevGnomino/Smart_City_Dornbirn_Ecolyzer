import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import red from './../icons/red.png';
import dark_orange from './../icons/dark_orange.png';
import light_orange from './../icons/light_orange.png';
import yellow from './../icons/yellow.png';
import green from './../icons/green.png';
import yellow_green from './../icons/yellow_green.png';
import InfluxMarker from '../database/InfluxDBConnect';


export default function MapComponent() {
    const [icon, setIcon] = useState(red);

    const dornbirnCenter = [47.421169, 9.747031]; //47.421169, 9.747031

    const IconChange = (intensity) => {
        if(0<=intensity && intensity<0.15)
        {
            setIcon(green);
        }else if(0.15<=intensity && intensity<0.3){
            setIcon(yellow_green);
        }else if(0.3<=intensity && intensity<0.45){
            setIcon(yellow);
        }else if(0.45<=intensity && intensity<0.6){
            setIcon(light_orange);
        }else if(0.6<=intensity && intensity<0.8){
            setIcon(dark_orange);
        }else if(0.8<=intensity && intensity<=1){
            setIcon(red);
        }  
    }

    const DefaultIcon = L.icon({
        iconUrl: icon,
        iconSize: [90, 90],
        iconAnchor: [45, 45],
        popupAnchor: [0, 0]
    });

    //console.log(vehicleData);

    return (
        <div className="w-screen h-5/6 flex mt-32 p-5 pt-0 text-green-800 overflow-hidden fixed">
            <div id="map" className="w-full h-auto overflow-hidden border-solid border-4 border-green-800 rounded-2xl bg-blue box-border">
                <MapContainer center={dornbirnCenter} zoom={14} zoomControl={false} scrollWheelZoom={true} style={{ height: '100vh', width: '100wh' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <InfluxMarker DefaultIcon={DefaultIcon}></InfluxMarker>
                </MapContainer>
            </div>
        </div>
    );
    
}
