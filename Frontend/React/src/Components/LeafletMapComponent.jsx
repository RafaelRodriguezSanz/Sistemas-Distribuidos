import React, { Component, useEffect, useState  } from "react";
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
// const flow = 53
const center = [latitud, longitud];
const url = 'http://localhost:8086'
const token = '0qfrVjTKP-s9VZ_msUoZqez5ubytxENzCZo93WNE1_rzI-2k59tTLcRTMHCsWlxm67paxbCKInl0b8HzG5PzLg=='
const queryApi = new InfluxDB({url , token}).getQueryApi('UCU')

const [data, setData] = useState([])

const MINUTE_MS = 5000;

useEffect(() => {
  const interval = setInterval(() => {
    queryRaw()
  }, MINUTE_MS);
  return () => clearInterval(interval);
}, [])

async function queryRaw() {
  data = [];
  const fluxQuery = `
    from(bucket: "DATA")
    |> range(start: -60s)
    |> filter(fn: (r) => r["_measurement"] == "metric")
    |> filter(fn: (r) => r["_field"] == "flow")
    |> filter(fn: (r) => r["host"] == "host1")
    |> group(columns: ["latitud", "longitud"])
    |> group(columns: ["Montevideo"])
  `
  // const queryResult = queryApi.collectRows(fluxQuery);
  // const result = await queryApi.queryRaw(fluxQuery)
  // console.log('\nQueryRaw SUCCESS>')
  // console.log(result)
  
  for await (const {values, tableMeta} of queryApi.iterateRows(fluxQuery)) {
    const o = tableMeta.toObject(values)
    console.log(
      `latitud:  ${o._latitud} 
      longitud: ${o._longitud}`
      )
    data.push({
      latitud: o._latitud,
      longitud: o._longitud,
      flow: o._flow 
    });
  }

}


class LeafletMapComponent extends Component {
  render(){
    return (
      <Paper elevation={3}>
          <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
            />
            <CircleMarker center={center} pathOptions={{ color: "rgba(117, 248, 255, 25)" }} radius={30}>
              <Marker center={center} icon={icon}>
              {data.map((values) => 
                <Popup> 
                  Latitud: {values.latitud}
                  <br /> 
                  Longitud: {values.longitud}
                  <br /> 
                  Caudal: {values.flow} m³/s
                </Popup>
              )}
              
              </Marker>
            </CircleMarker>
          </MapContainer>
          <button onClick={queryRaw}>Click me</button>
      </Paper>
    );
  }
};


export default LeafletMapComponent;
