import React from 'react';
import '../App.css';
import InfluxDBComponent from '../Components/InfluxDBComponent';
import DrawerComponent from '../Components/DrawerComponent';

function InfluxDB() {
  return (
    <div className="InfluxDB">
        <DrawerComponent content={InfluxDBComponent}></DrawerComponent>
    </div>
  );
}

export default InfluxDB;
