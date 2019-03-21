import React from "react";
import { withRouter } from "react-router-dom";

const StationList = props => {
  const { stationList } = props;
  console.log("STATIONLIST : stationList:", stationList);
  return (
    <div className="stock-list">
      {stationList &&
        stationList.map((station, index) => (
          <div key={index} className="station-container">
            <div className="station-information">{station.name}</div>
            <div className="station-buttons-container">
              <button
                className="station-button"
                onClick={() =>
                  props.history.push(`/stations/${station.id}`)}
              >
                View Station
              </button>
              <button
                className="station-button"
                onClick={() =>
                  props.history.push(`/stations/${station.id}/comments/new`)
                }
              >
                Comment
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default withRouter(StationList);
