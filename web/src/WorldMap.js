import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { user } from './modules/entities';

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


class WorldMap extends React.Component {
  render() {
    const { currentUser } = this.props;

    return (
    <ComposableMap
      projection="geoEqualEarth"
      projectionConfig={{
        rotate: [0, 0, 0],
        scale: 100
      }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return(
            <Geography
              key={geo.rsmKey}
              geography={geo}
              stroke="#EAEAEC"
              fill={currentUser.country.name === geo.properties.NAME ? "tomato" : '#d9dce0'}
              strokeWidth={0}
            />)}
          )
        }
      </Geographies>
      <Marker key={"user"} coordinates={[currentUser.country.longitude, currentUser.country.latitude]}>
          <circle r={2} fill="#F00" stroke="#fff" strokeWidth={1} />          
        </Marker>
      <Line
        from={[currentUser.country.longitude, currentUser.country.latitude]}
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
  }
}


const mapStateToProps = store => {
  return {
    currentUser: denormalize(store.auth.currentUser.id, user, store.entities),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorldMap);
