import React, { useEffect, useState } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker,
  Line
} from "react-simple-maps";
import './WorldMap.css';
const geoUrl =
"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const WorldMap = () => {
  const [data, setData] = useState([]);

  return (
    <ComposableMap
      projection="geoEqualEarth"
      projectionConfig={{
        rotate: [0, 0, 0],
        scale: 200
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const countriesMailed = ['Sweden', "Australia"];

            return(
            <Geography
              key={geo.rsmKey}
              geography={geo}
              stroke="#EAEAEC"
              fill={countriesMailed.includes(geo.properties.NAME) ? "tomato" : 'white'}
              strokeWidth={0}
            />)}
          )
        }
      </Geographies>
      <Marker key={"user"} coordinates={[2.3522, 48.8566]}>
          <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {"You"}
          </text>
        </Marker>
      <Line
        from={[2.3522, 48.8566]}
        to={[-74.006, 40.7128]}
        stroke="#FF5533"
        strokeWidth={2}
        strokeLinecap="round"
      />
        <Marker key={"Liberian89"} coordinates={[-74.006, 40.7128]}>
          <circle r={5} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {"Liberian89"}
          </text>
        </Marker>
        <Marker key={"From"} coordinates={[-90.006, 30.7128]}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {"from"}
          </text>
        </Marker>
    </ComposableMap>
);
};

export default WorldMap;