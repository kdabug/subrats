import React, { Component } from "react";
import StationList from "./StationList";
import Map from "./Map";
import { Link } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeStations: []
    };
  }
  createCloseStations() {
    const { user, stationList, currentLoction } = this.props;
    const stations = stationList.filter(station => station.geolocation);
  }
  //   initMap() {
  //     map = new google.maps.Map(document.getElementById("map"), {
  //       center: { lat: -34.397, lng: 150.644 },
  //       zoom: 8
  //     });
  //   }
  componentDidMount() {
    this.createCloseStations();
  }
  render() {
    console.log(this.props.currentLocation)
    return (
      <div className="home-container">
        <div className="map-container">
          <h1>HOME</h1>
          {
            (this.props.currentLocation !== '')?
              <Map
                currentLocation={this.props.currentLocation}
                stationData={this.props.stationData}
              />:
              <>
              loading
              </>
          }
        </div>
      </div>
    );
  }
}
export default Home;
