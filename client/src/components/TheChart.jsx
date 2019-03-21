import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";
import React from "react";
ReactChartkick.addAdapter(Chart);

const TheChart = props => {
  const chart = (
    <div className="chart-container">
      <LineChart
        data={props.chartData}
        title={props.stationId}
        min={null}
        max={null}
        width={vw || "800px"}
        height={auto || "auto"}
      />
    </div>
  );
  return props.chartData && <div className="chart-container">{chart}</div>;
};
export default TheChart;
