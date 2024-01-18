import { useState, useCallback } from 'react';
import MapGl from 'react-map-gl';

import DrawControl from './draw-control';
import ControlPanel from './control-panel';
import React from 'react';

export default function Map() {
    const [features, setFeatures] = useState({});

    const onUpdate = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                newFeatures[f.id] = f;
            }
            return newFeatures;
        });
    }, []);

    const onDelete = useCallback(e => {
        setFeatures(currFeatures => {
            const newFeatures = {...currFeatures};
            for (const f of e.features) {
                delete newFeatures[f.id];
            }
            return newFeatures;
        });
    }, []);

    // Define the size of the map
    const mapSize = {
        width: '100vw',
        height: '100vh'
    };

    return (
        <>
            <MapGl
                {...mapSize}
                initialViewState={{
                    longitude: -91.874,
                    latitude: 42.76,
                    zoom: 12
                }}
                mapStyle="mapbox://styles/mapbox/satellite-v9"
                mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            >
                <DrawControl
                    position="top-left"
                    displayControlsDefault={false}
                    controls={{
                        polygon: true,
                        trash: true
                    }}
                    defaultMode="draw_polygon"
                    onCreate={onUpdate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            </MapGl>
            <ControlPanel polygons={Object.values(features)} />
        </>
    );
}
