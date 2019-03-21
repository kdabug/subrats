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
    this.findCloseStations = this.findCloseStations.bind(this);
  }

  findCloseStations() {
    const closeStations = this.props.stationData.filter((station, index) => {
      const { geolocation } = station;
      const step1 = geolocation.replace("POINT (", "");
      const step2 = step1.replace(")", "");
      const step3 = step2.split(" ");
      const lng = parseInt(step3[0]);
      const lat = parseInt(step3[1]);
      const { currentLocation } = this.props;
      if (
        (lat > currentLocation.lat - 0.003 ||
          lat < currentLocation.lat + 0.03) &&
        (lng > currentLocation.lng - 0.003 || lng < currentLocation.lng + 0.003)
      ) {
        return station;
      }
    });
    this.setState((prevState, newState) => ({
      closeStations: closeStations
    }));
    console.log("frtfgyhubhy", this.state.closeStations);
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
