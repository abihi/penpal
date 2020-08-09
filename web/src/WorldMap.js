import React from "react";
import { connect } from 'react-redux';
import { denormalize } from 'normalizr';
import { user } from './modules/entities';

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker
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
            rotate: [-currentUser.country.longitude, -currentUser.country.latitude, 0],
            scale: 100
          }}
          width={600}
          height={400}
          style={{ width: "100%", height: "auto" }}
        >
          <ZoomableGroup center={[currentUser.country.longitude, currentUser.country.latitude]} zoom={2}>
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
