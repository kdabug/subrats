import React, { Component } from "react";
import StationList from "./StationList";
import Map from "./Map";
import { Link } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      closeStations: null
    };
  }

  componentDidMount() {
    this.setState({
      closeStations: this.props.stationData
    })
  }
  render() {
    console.log(this.props.currentLocation)
    return (
      <div className="home-container">
        <div className="map-container">
          {
            (this.props.currentLocation !== '')?
              <Map
                currentLocation={this.props.currentLocation}
                stationData={this.props.stationData}
                history={this.props.history}
              />
            :
              <>
              loading
              </>
          }
        </div>
        {
          this.state.closeStations?
          <StationList stationList={this.state.closeStations}/>
            :
            <></>
        }
      </div>
    );
  }
}
export default Home;
