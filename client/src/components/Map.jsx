import React, { Component } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
const mapStyles = require('../services/mapStyles.json')
export class StationMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPlace: {},
    }
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
    })
    this.props.history.push(`/stations/${this.state.selectedPlace.id}`);
  };

  render() {
    const { lat, lng } = this.props.currentLocation

    return (
      <Map
        style={{width: '100%', height: '50vh', position: 'relative' }}
        onClick={this.onMapClicked}
        google={this.props.google}
        centerAroundCurrentLocation={true}
        styles= {[
           {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
           {
             featureType: 'administrative.locality',
             elementType: 'labels.icon',
             stylers: [{color: '#d59563'},
           {visibility: 'off'}],
           },
           {
             featureType: 'poi',
             elementType: 'labels.icon',
             stylers: [{visibility: 'off'}],
           },
           {
             featureType: 'poi.park',
             elementType: 'labels.icon',
             stylers: [{color: '#263c3f'},
           {visibility: 'off'}],
           },
           {
             featureType: 'road',
             elementType: 'geometry',
             stylers: [{color: '#38414e'}]
           },
           {
             featureType: 'road',
             elementType: 'geometry.stroke',
             stylers: [{color: '#212a37'}]
           },
           {
             featureType: 'road',
             elementType: 'labels.text.fill',
             stylers: [{color: '#9ca5b3'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'geometry',
             stylers: [{color: '#746855'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'geometry.stroke',
             stylers: [{color: '#1f2835'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'labels.text.fill',
             stylers: [{color: '#f3d19c'}]
           },
           {
             featureType: 'transit',
             elementType: 'geometry',
             stylers: [{visibility: 'off'}]
           },
           {
             featureType: 'transit.station',
             elementType: 'labels.icon',
             stylers: [{visibility: 'off'}]
           },
           {
             featureType: 'water',
             elementType: 'geometry',
             stylers: [{color: '#17263c'}]
           },
           {
             featureType: 'water',
             elementType: 'labels.text.fill',
             stylers: [{color: '#515c6d'}]
           },
           {
             featureType: 'water',
             elementType: 'labels.text.stroke',
             stylers: [{color: '#17263c'}]
           }
         ]}
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
              position={{ lat, lng }}
              icon={{
              path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
              fillColor: 'blue',
              fillOpacity: 1,
              strokeColor: 'white',
            }} />
          )
        })}
        <Marker
          onClick={this.onMarkerClick}
          name={'Your Here!'}
          position={{ lat, lng }}
          icon={{
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
          fillColor: 'yellow',
          fillOpacity: 1,
          strokeColor: 'gold',
        }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_APIKEY
})(StationMap)
