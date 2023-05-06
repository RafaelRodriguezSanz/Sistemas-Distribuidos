import React from 'react';
import '../App.css';
import ChronografComponent from '../Components/ChronografComponent';
import DrawerComponent from '../Components/DrawerComponent';

function Chronograf() {
  return (
    <div className="Chronograf">
        <DrawerComponent content={ChronografComponent}></DrawerComponent>
    </div>
  );
}

export default Chronograf;
