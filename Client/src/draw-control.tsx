import React, { useRef, useEffect } from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';

import type { ControlPosition } from 'react-map-gl';

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;
};

export default function DrawControl(props: DrawControlProps) {
  const drawRef = useRef<MapboxDraw>();

  useControl<MapboxDraw>(
      () => {
        const draw = new MapboxDraw(props);
        drawRef.current = draw;
        return draw;
      },
      {
        position: props.position,
      },
  );

  // Function to start drawing a new polygon
  const createPolygon = () => {
    drawRef.current?.changeMode('draw_polygon');
  };

  const editPolygon = () => {
    // Add logic here to enable editing of existing polygons
  };


  const deletePolygon = () => {
    drawRef.current?.deleteAll();
  };

  const deleteSelectedPolygons = () => {
    const draw = drawRef.current;
    if (draw) {
      const selectedIds = draw.getSelectedIds();
      if (selectedIds.length > 0) {
        draw.delete(selectedIds);
      }
    }
  };

  return (
      <div style={{position: "relative", zIndex: 20}}>
        <button onClick={createPolygon} className="draw-control-button">
          <span className="material-icons">add</span>
        </button>
        <button onClick={editPolygon} className="draw-control-button">
          <span className="material-icons">edit</span>
        </button>
        <button onClick={deletePolygon} className="draw-control-button">
          <span className="material-icons">delete all</span>
        </button>
        <button onClick={deleteSelectedPolygons} className="draw-control-button">
          <span className="material-icons">delete selected</span>
        </button>
      </div>
  );
}
