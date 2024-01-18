import React from "react";
import { useState, useCallback } from "react";
import MapGl from "react-map-gl";

import DrawControl from "./draw-control";
import ControlPanel from "./control-panel";

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

export default function Map() {
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  // Define the size of the map
  const mapSize = {
    width: "100vw",
    height: "100vh",
  };

  return (
    <div style={{ height: "90vh", width: "100vh" }}>
      <MapGl
        {...mapSize}
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
          position="top-left"
          displayControlsDefault={true}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </MapGl>
      <ControlPanel polygons={Object.values(features)} />
    </div>
  );
}
