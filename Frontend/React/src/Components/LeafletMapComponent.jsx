import * as React from 'react';
import { MapContainer  , TileLayer, Marker, Popup } from 'react-leaflet';

const position = [-34.90328, -56.18816];


class LeafletMapComponent extends Component {
  render(){
    return (
          <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
            />
          </MapContainer>
    );
  }
};


export default LeafletMapComponent;
