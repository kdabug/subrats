import ReactChartkick, { LineChart } from "react-chartkick";
import Chart from "chart.js";
import React from "react";
ReactChartkick.addAdapter(Chart);

const TheChart = props => {
  const chart = (
    <div>
      <LineChart
        data={props.chartData}
        title={props.stationId}
        min={null}
        max={null}
        width={"800px"}
        height={"400px"}
        hAxis={"Time"}
        vAxis={props.yAxis}
      />
    </div>
  );
  return props.chartData && <div className="chart-container">{chart}</div>;
};
export default TheChart;
