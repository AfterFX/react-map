import React from "react";
import { useState, useCallback } from "react";
import MapGl from "react-map-gl";

import DrawControl from "./draw-control";
import ControlPanel from "./control-panel";

export default function Map() {
  const [features, setFeatures] = useState({});



  return (
    <div style={{ height: "90vh", width: "100vh" }}>
      <MapGl
        initialViewState={{
          longitude: -122.45,
          latitude: 37.78,
          zoom: 14,
        }}
        // mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
      >
        <DrawControl
          displayControlsDefault={false}
        />
      </MapGl>
      <ControlPanel polygons={Object.values(features)} />
    </div>
  );
}
