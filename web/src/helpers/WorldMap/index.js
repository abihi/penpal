import React, { useEffect, useState } from "react";
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
import './index.scss';
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


class WorldMap extends React.Component {
  render() {
    const { longitude, latitude, countryOfEmphasis, zoom, style } = this.props;

    return (
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            rotate: [-longitude, -latitude, 0.0],
            scale: 100
          }}
          width={600}
          height={400}
          center={[longitude, latitude]}
          style={style}
        >
          <ZoomableGroup center={[longitude, latitude]} zoom={zoom}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  return(
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="#EAEAEC"
                    fill={countryOfEmphasis === geo.properties.NAME ? "rgb(255, 182, 175)" : '#d9dce0'}
                    strokeWidth={0}
                  />)}
                )
              }
            </Geographies>
            <Marker key={"user"} coordinates={[longitude, latitude]}>
                <circle r={2} fill="#F00" stroke="#fff" strokeWidth={1} />
            </Marker>
          </ZoomableGroup>
        </ComposableMap>
    );
  }
}

export default WorldMap;
