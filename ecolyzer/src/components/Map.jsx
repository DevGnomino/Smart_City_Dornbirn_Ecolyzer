import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const mapPosition = [47.4167, 9.75];

  return (
    <div class="w-full h-fit border-solid border-4 rounded-none">
        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} style={{ height: '90vh', width: '100wh' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={mapPosition}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
  </div>);
}
