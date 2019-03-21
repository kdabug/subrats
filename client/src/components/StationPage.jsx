import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { fetchStationData } from "../services/users-helpers";
import CommentList from "./CommentList";
import TheChart from "./TheChart";
import ReactChartkick, { LineChart, PieChart } from "react-chartkick";
import Chart from "chart.js";

ReactChartkick.addAdapter(Chart);

class StationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationData: '',
      has_data: false,
      chartData: []
    };
    this.compileChartData = this.compileChartData.bind(this);
  }

  compileChartData() {
    const chartData = this.state.stationData.map((data, el) => [
      //   data.label,
      //   data.average
    ]);
    this.setState((prevState, newState) => ({
      chartData: chartData
    }));
  }

  async componentDidMount() {
    const stationData = await fetchStationData(this.props.match.params.id);
    this.setState((prevState, newState) => ({
      stationData: stationData,
      has_data: true
    }));
  };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchStationData();
    }
  }
  render() {
    return (
      <>
      {
        (this.state.has_data)?
        <>
          <h1>{this.state.stationData.name}</h1>
          <h2>{this.state.stationData.lines}</h2>
          <h3>details: {this.state.stationData.details}</h3>
          <button
            className="station-button"
            onClick={() =>
              this.props.history.push(
                `/station/${this.props.match.params.id}/comments/new`
              )
            }
          >
            Comment
          </button>
          <button className="station-button">Favorite</button>
          <h2>Average Activity</h2>
          <h2>Average Cleanliness</h2>
          <h2>Average Timeliness</h2>
          <TheChart
            yAxis={"Busy"}
            chartData={this.state.chartData}
            stationId={this.props.match.params}
          />
          {/* <div className="chart-container">{lineChart}</div> */}
          {/* <CommentList commentData={this.stationData.comments} /> */}
        </>:
        <>
        loading
        </>
    }
    </>
    );
  }
}
export default withRouter(StationPage);
