import React, { Component } from "react";
import StationList from "./StationList";
import Map from "./Map";
import { Link } from "react-router-dom";
import geolib from "geolib";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeStations: []
    };
    this.findCloseStations = this.findCloseStations.bind(this);
  }

  findCloseStations() {
    const closeStations = this.props.stationData.map((station, index) => {
      const { geolocation } = station;
      const step1 = geolocation.replace('POINT (', '');
      const step2 = step1.replace(')', '');
      const step3 = step2.split(' ');
      const lng = step3[0];
      const lat = step3[1];
      const stationDistance = geolib.getDistance(
        { latitude: this.props.currentLocation.lat,
          longitude: this.props.currentLocation.lng},
        { latitude: lat,
          longitude: lng});
      console.log(stationDistance);
    })
  }

  componentDidMount() {
    this.findCloseStations();
  }
  render() {
    console.log("this is home currentLocation", this.props.currentLocation);
    console.log("this is home this.props", this.props);
    return (
      <div className="home-container">
        <div className="map-container">
          {this.props.currentLocation !== "" ? (
            <Map
              currentLocation={this.props.currentLocation}
              stationData={this.props.stationData}
              history={this.props.history}
            />
          ) : (
            <>loading</>
          )}
        </div>
        {this.state.closeStations ? (
          <StationList className="station-list" stationList={this.state.closeStations} />
        ) : (
          <></>
        )}
      </div>
    );
  }
}
export default Home;
