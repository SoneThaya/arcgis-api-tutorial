import React, { useRef, useEffect } from "react";
import { loadModules } from "esri-loader";

const Map = () => {
  const MapEl = useRef(null);

  useEffect(() => {
    let view;

    loadModules(
      ["esri/views/MapView", "esri/WebMap", "esri/layers/GeoJSONLayer"],
      {
        css: true,
      }
    ).then(([MapView, WebMap, GeoJSONLayer]) => {
      const webmap = new WebMap({
        basemap: "topo-vector",
      });
      view = new MapView({
        map: webmap,
        center: [-83, 42.25],
        zoom: 10,
        // use the ref as a container
        container: MapEl.current,
      });

      const geojsonLayer = new GeoJSONLayer({
        url: "https://raw.githubusercontent.com/adarshvarma15/mygeojson/main/RMS_Crime_Incidents%20edited.geojson",
      });

      webmap.add(geojsonLayer);
    });

    return () => {
      // close map view
      if (!!view) {
        view.destroy();
        view = null;
      }
    };
  }, []);

  return <div style={{ height: 800 }} ref={MapEl}></div>;
};

export default Map;
