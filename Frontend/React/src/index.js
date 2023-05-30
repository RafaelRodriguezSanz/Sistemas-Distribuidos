import React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import LeafletMap from './Pages/LeafletMap';
import Chronograf from './Pages/Chronograf.js';
import InfluxDB from './Pages/InfluxDB';
// import Kapacitor from './Pages/Kapacitor';
// import Telegraf from './Pages/Telegraf';
// import Mosquito from './Pages/Mosquito';
// import Sensors from './Pages/Sensors';
// import Consumers from './Pages/Consumers';
// import Nginx from './Pages/Nginx';
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Auth0Provider
    domain={"sistemas-distribuidos.us.auth0.com"}
    clientId={"KtpO5qNeeKWG2JZg4JuxizAL41rN7Fn7"}
    redirectUri={"http://localhost:3000/"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LeafletMap />}/>
          <Route path="/Map" element={<LeafletMap />}/>
          <Route path="/Chronograf" element={<Chronograf />} />
          <Route path="/InfluxDB" element={<InfluxDB />} />
          {/* <Route path="/Kapacitor" element={<Kapacitor />} />
          <Route path="/Telegraf" element={<Telegraf />} />
          <Route path="/Mosquito" element={<Mosquito />} />
          <Route path="/Sensors" element={<Sensors />} />
          <Route path="/Consumers" element={<Consumers />} />
          <Route path="/Nginx" element={<Nginx />} /> */}
        </Routes>
      </BrowserRouter>
  </Auth0Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
reportWebVitals(console.log);