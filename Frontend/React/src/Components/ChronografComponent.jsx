import React, { Component } from "react";
import IframeComponent from "./IframeComponent";

class InfluxDBComponent extends Component {
    render() {
        return <IframeComponent url="http://localhost:8888/sources/new?redirectPath=/"/> 
            
      }
}

export default InfluxDBComponent;