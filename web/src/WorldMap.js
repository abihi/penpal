import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { user } from './modules/entities';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  Marker,
  Line
} from "react-simple-maps";
import './WorldMap.scss';
const geoUrl =
"https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


class WorldMap extends React.Component {
  render() {
    const { currentUser } = this.props;
    
    return (
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            scale: 105,
            rotation: [-150, 60, 55],
          }}
          width={800}
          height={400}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup zoom={1}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  return(
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#EAEAEC"
                    fill={currentUser.country.name === geo.properties.NAME ? "rgb(255, 182, 175)" : '#d9dce0'}
                    strokeWidth={0}
                  />)}
                )
              }
            </Geographies>
              <div coordinates={[currentUser.country.longitude, currentUser.country.latitude]} className="pulsating" />
            <Marker key={"user"} coordinates={[currentUser.country.longitude, currentUser.country.latitude]}>
                <circle r={2} fill="#F00" stroke="#fff" strokeWidth={1} />
            </Marker>
          </ZoomableGroup>
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
