import React from 'react';
<<<<<<< HEAD
import ReactDOM from 'react-dom';
=======
import ReactDOM from 'react-dom/client';
>>>>>>> master
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/Login';
import LeafletMap from './Pages/LeafletMap';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/map" element={<LeafletMap />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
reportWebVitals(console.log);
