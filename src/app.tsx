import * as React from 'react';
import {useState, useCallback} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {Marker, NavigationControl} from 'react-map-gl';

import ControlPanel from './control-panel';
import Pin from './pin';

import type {MarkerDragEvent, LngLat} from 'react-map-gl';

//const TOKEN = ''; // Set your mapbox token hereconst TOKEN = 'pk.eyJ1IjoibGVpZ2hoYWxsaWRheSIsImEiOiJjaXYycWhpaGwwMGVjMnRtdWJvZXpwZGtyIn0.LXDrQGp__svQhdmx4w5k0w'; // Set your mapbox token here
const TOKEN = 'pk.eyJ1IjoidGVjaG1vYmlsZWJveCIsImEiOiJjbHhpNnlpdXMxaW5vMmtvZ3NlNzU3bDU1In0.Raq4E7gYfHmvfg70hkY_zg';


const initialViewState = {
  latitude: 40,
  longitude: -100,
  zoom: 1.5
};

export default function App() {
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100
  });
  const [events, logEvents] = useState<Record<string, LngLat>>({});

  const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragStart: event.lngLat}));
  }, []);

  const onMarkerDrag = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDrag: event.lngLat}));

    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat
    });
  }, []);

  const onMarkerDragEnd = useCallback((event: MarkerDragEvent) => {
    logEvents(_events => ({..._events, onDragEnd: event.lngLat}));
  }, []);

  return (
    <>
      <Map
        fog= {{}}
        initialViewState={initialViewState}
        //mapStyle="mapbox://styles/mapbox/dark-v9"
        mapStyle="mapbox://styles/mapbox/light-v11"
        mapboxAccessToken={TOKEN}
      >
        <Marker
          longitude={marker.longitude}
          latitude={marker.latitude}
          anchor="bottom"
          draggable
          onDragStart={onMarkerDragStart}
          onDrag={onMarkerDrag}
          onDragEnd={onMarkerDragEnd}
        >
          <Pin size={20} />
        </Marker>

        <NavigationControl />
      </Map>
      <ControlPanel events={events} />
    </>
  );
}

export function renderToDom(container) {
  createRoot(container).render(<App />);
}
