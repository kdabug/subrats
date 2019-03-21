import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import {
  fetchStationData,
  favoriteStation,
  deleteFavoriteStation,
  fetchStationComments
} from "../services/users-helpers";
import CommentList from "./CommentList";
import TheChart from "./TheChart";
import ReactChartkick, { LineChart, PieChart } from "react-chartkick";
import Chart from "chart.js";

ReactChartkick.addAdapter(Chart);

class StationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stationData: "",
      stationComments: "",
      has_data: false,
      chartData: [],
      avgClean: "",
      avgWait: "",
      avgActivity: ""
    };
    this.compileChartData = this.compileChartData.bind(this);
    this.getStationData = this.getStationData.bind(this);
  }

  compileChartData() {
    const chartDataActivity = {
      name: "activity",
      data: this.state.stationComments.map((data, el) => [
        data.at_station,
        data.activity
      ])
    };
    const chartDataWait = {
      name: "wait",
      data: this.state.stationComments.map((data, el) => [
        data.at_station,
        data.wait_time
      ])
    };
    const chartDataClean = {
      name: "cleanliness",
      data: this.state.stationComments.map((data, el) => [
        data.at_station,
        data.cleanliness
      ])
    };
    const chartData = [chartDataClean, chartDataActivity, chartDataWait];
    console.log("this is chartData", chartData);
    this.setState((prevState, newState) => ({
      chartData: chartData
    }));
  }

  async getStationData() {
    const stationData = await fetchStationData(this.props.match.params.id);
    const stationComments = await fetchStationComments(
      this.props.match.params.id
    );
    this.setState((prevState, newState) => ({
      stationData: stationData,
      stationComments: stationComments,
      has_data: true
    }));
    if (stationComments.length > 0) {
      // dividing by 0 will return Infinity
      // arr must contain at least 1 element to use reduce
      function findAvg(arr) {
        console.log(stationComments);
        let sum = 0;
        let avg = 0;
        sum = arr.reduce(function(a, b) {
          return a + b;
        });
        avg = sum / arr.length;
        return avg.toFixed(2);
      }
      const avgClean = findAvg(
        stationComments.map(comment => comment.cleanliness)
      );
      const avgWait = findAvg(
        stationComments.map(comment => comment.wait_time)
      );
      const avgActivity = findAvg(
        stationComments.map(comment => comment.activity)
      );

      this.setState((prevState, newState) => ({
        avgActivity: avgActivity,
        avgWait: avgWait,
        avgClean: avgClean
      }));
      this.compileChartData();
    }
  }
  async addFavorite() {
    await favoriteStation(this.props.match.params.id, this.props.userData.user.id);
  }
  async deleteFavorite() {
    await deleteFavoriteStation(this.props.match.params.id, this.props.userData.user.id);
  }
  async componentDidMount() {
    await this.getStationData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getStationData();
      this.setState({
        has_data: true
      });
    }
  }
  render() {
    console.log("stationData on stationPage", this.state.stationComments);
    return (
      <>
        {this.state.has_data ? (
          <>
            <h1>{this.state.stationData.name}</h1>
            <h2>{this.state.stationData.lines}</h2>
            <h3>details: {this.state.stationData.details}</h3>
            <button
              className="station-button"
              onClick={() =>
                this.props.history.push(
                  `/stations/${this.props.match.params.id}/comments/new`
                )
              }
            >
              Comment
            </button>
            {this.state.stationComments.length > 0 ? (
              <>
                <div>
                  <h1>{this.state.avgActivity}</h1>
                  <h2>Average Activity</h2>
                </div>
                <div>
                  <h1>{this.state.avgClean}</h1>
                  <h2>Average Cleanliness</h2>
                </div>
                <div>
                  <h1>{this.state.avgWait}</h1>
                  <h2>Average Timeliness</h2>
                </div>
                <TheChart
                  chartData={this.state.chartData}
                  stationId={this.state.stationData.name}
                />
                {/* <div className="chart-container">{lineChart}</div> */}
                <CommentList commentData={this.state.stationComments} />
              </>
            ) : (
              <p>'no comments yet!'</p>
            )}
          </>
        ) : (
          <>loading</>
        )}
      </>
    );
  }
}
export default withRouter(StationPage);
