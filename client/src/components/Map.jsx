import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
export class StationMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
    })
    this.props.history.push(`/stations/${this.state.selectedPlace.id}`);
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  onInfoClick = (props, e) => {
    console.log(this.props.history);
  }

  render() {
    const { lat, lng } = this.props.currentLocation
    return (
      <Map
        style={{width: '100%', height: '50vh', position: 'absolute'}}
        onClick={this.onMapClicked}
        google={this.props.google}
        centerAroundCurrentLocation={true}
        zoom={16}>
        {this.props.stationData.map((station, index) => {
          const {geolocation} = station;
          const step1 = geolocation.replace('POINT (', '');
          const step2 = step1.replace(')', '');
          const step3 = step2.split(' ');
          const lng = step3[0];
          const lat = step3[1];

          return(
            <Marker
              key={index}
              onClick={this.onMarkerClick}
              title={station.name+" "+station.lines}
              id={station.id}
              position={{ lat, lng }} />
          )
        })}
        <Marker
          onClick={this.onMarkerClick}
          name={'Your Here!'}
          position={{ lat, lng }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_APIKEY
})(StationMap)
