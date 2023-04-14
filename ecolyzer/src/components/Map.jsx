import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from './../icons/marker.png';


export default function Map() {
  const mapPosition = [47.4167, 9.75];
  
  const DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize: [50, 50],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  });


  return (
    <MapContainer center={mapPosition} zoom={14} zoomControl={false} scrollWheelZoom={true} style={{ height: '100vh', width: '100wh' }}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition} icon={DefaultIcon}>
            <Popup>
                <p className="font-bold">Hier sind aktuell 5 Autos.</p>
                <p>Das ist wahrlich wunderbar.</p>
                <p>Wiedersehen!</p>
            </Popup>
        </Marker>
    </MapContainer>
    );
}
