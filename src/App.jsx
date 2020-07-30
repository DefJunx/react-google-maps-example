import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from './components/Map';
import { useMapState } from './map-context';

function App() {
  const state = useMapState();
  const [mapId, setMapId] = useState();

  const setZoomMap = (e) => {
    state[mapId].setZoom(1);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <GoogleMap onMapInit={(val) => setMapId(val)}></GoogleMap>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <button onClick={setZoomMap}>Get zoom</button>
      </header>
    </div>
  );
}

export default App;
