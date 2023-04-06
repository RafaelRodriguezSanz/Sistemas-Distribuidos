import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(map);
  }, []);

  return <div ref={mapRef} style={{ height: 400 }}></div>;
}

export default Map;