/**
 * Created by Youngchan Je on 2016-08-24.
 */
import React, {Component} from 'react';
import {GoogleMapLoader, GoogleMap} from "react-google-maps";

class Maps extends Component {
  render() {
    //const {}
    return (
      <section style={{height: "100%"}}>
        <GoogleMapLoader
          containerElement={
            <div
              //{...props.containerElementProps}
              style={{
                height: "500px",
                width: "500px"
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => console.log(map)}
              defaultZoom={3}
              defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
              //onClick={props.onMapClick}
            />
          }
        />
      </section>
    );
  }
}

export default Maps;
