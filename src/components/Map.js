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

      const renderer = {
        type: "simple",
        field: "total_deaths",
        symbol: {
          type: "simple-marker",
          color: "orange",
          outline: {
            color: "white",
          },
        },
        visualVariables: [
          {
            type: "color",
            field: "total_deaths",
            stops: [
              {
                value: "12000",
                color: "#493d26",
              },
              {
                value: "20000",
                color: "red",
              },
              {
                value: "26003",
                color: "green",
              },
              {
                value: "38003",
                color: "#c85a17",
              },
              {
                value: "26009",
                color: "purple",
              },
              {
                value: "70000",
                color: "#565051",
              },
              {
                value: "24001",
                color: "brown",
              },
              {
                value: "13002",
                color: "#f75d59",
              },
            ],
          },
        ],
      };

      const template = {
        title: "World War II Casualties",
        content: "{country}: {total_deaths} total deaths",
      };

      view = new MapView({
        map: webmap,
        center: [14.550072, 47.516231],
        zoom: 3,
        // use the ref as a container
        container: MapEl.current,
      });

      const geojsonLayer = new GeoJSONLayer({
        url: "https://raw.githubusercontent.com/SoneThaya/mygeojson/main/RMS_Crime_Incidents%20edited.geojson",
        renderer: renderer,
        popupTemplate: template,
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
