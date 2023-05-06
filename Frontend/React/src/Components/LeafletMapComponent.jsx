import React, { useEffect, useState  } from "react";
import { MapContainer  , TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import '../App.css';
import markerIcon from '../img/pipe.png';
import { Paper } from "@mui/material";
import {InfluxDB} from '@influxdata/influxdb-client'

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

const center = [latitud, longitud];
const url = 'http://localhost:8086'
const token = '0qfrVjTKP-s9VZ_msUoZqez5ubytxENzCZo93WNE1_rzI-2k59tTLcRTMHCsWlxm67paxbCKInl0b8HzG5PzLg=='
const queryApi = new InfluxDB({url , token}).getQueryApi('UCU')

const MILI_SECONDS = 5000;

function LeafletMapComponent() {

  let [state, setState] = useState([])
  
  useEffect(() => {
    const interval = setInterval(async () => {
      let data = []
      const fluxQuery = `
        from(bucket: "DATA")
        |> range(start: -5s)
        |> filter(fn: (r) => r["host"] == "host1")
        |> filter(fn: (r) => r["_measurement"] == "metric")
          `
        
        let latitudValue=0
        let longitudValue=0
        let flowValue=0
        try {
          for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
            const o = tableMeta.toObject(values)
            if (o._field === "latitude") {
              latitudValue = o._value
            }
            if (o._field === "longitud") {
              longitudValue = o._value
            }
            if (o._field === "flow") {
              flowValue = o._value
            }
          }
        } catch (error) {
          console.log("InfluxDB Unavailable!")
          latitudValue = -34.90328;
          longitudValue =  -56.18816;
          flowValue =  43;
        }
        data.push({
          flow: flowValue,
          center: [latitudValue, longitudValue],
          index : data.length
        });
        setState(data);
          
    }, MILI_SECONDS);
    return () => clearInterval(interval);
  }, [])

  
    return (
      <Paper elevation={3}>
          <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
            />
              {state.map((values) => 
                <CircleMarker  key={values.index + "-CircleMarker" } center={values.center} pathOptions={values.flow > 45 ? { color: "rgba(117, 248, 255, 25)" } : { color: "rgba(255, 118, 118, 25)" }} radius={30}>
                  <Marker key={values.index + "-Marker"} position={values.center} icon={icon}>
                    <Popup key={values.index + "-Popup"} > 
                      Latitud: {values.center[0]}
                      <br /> 
                      Longitud: {values.center[1]}
                      <br /> 
                      Caudal: {values.flow} m³/s
                    </Popup>
                  </Marker>
                </CircleMarker>
              )}
          </MapContainer>
          <button onClick={queryRaw}>Click me</button>
      </Paper>
    );
};


export default LeafletMapComponent;