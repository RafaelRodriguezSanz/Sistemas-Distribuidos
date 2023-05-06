import React, { Component } from "react";
import IframeComponent from "./IframeComponent";

class InfluxDBComponent extends Component {
    render() {
        return <IframeComponent url="http://localhost:8086"/>           
      }
}

export default InfluxDBComponent;