import React from 'react';
import '../App.css';
import LeafletMapComponent from '../Components/LeafletMapComponent';
import DrawerComponent from '../Components/DrawerComponent';

function LeafletMap() {
  return (
    <div className="LeafletMap">
      <>
        <DrawerComponent content={LeafletMapComponent}></DrawerComponent>
      </>
    </div>
  );
}

export default LeafletMap;
