import React, { Component } from "react";
import { MapContainer  , TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import '../App.css';
import markerIcon from '../img/pipe.png';
import { Paper } from "@mui/material";

const icon = L.icon({
  iconUrl: markerIcon,
  iconSize: [41, 41],
  iconAnchor: [19, 25],
  popupAnchor: [1, -34],
  tooltipAnchor: [1, 1],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null
});

const latitud = -34.90328
const longitud = -56.18816
const caudal = 53
const position = [latitud, longitud];


class LeafletMapComponent extends Component {
  render(){
    return (
      <Paper elevation={3}>
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
            />
            <CircleMarker center={position} pathOptions={{ color: "rgba(117, 248, 255, 25)" }} radius={30}>
              <Marker position={position} icon={icon}>
              <Popup> 
                Latitud: {latitud}
                <br /> 
                Longitud: {longitud}
                <br /> 
                Caudal: {caudal} m³/s
              </Popup>
              </Marker>
            </CircleMarker>
          </MapContainer>
      </Paper>
    );
  }
};


export default LeafletMapComponent;
