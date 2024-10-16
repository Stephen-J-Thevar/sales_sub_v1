import React from "react";
import ReactECharts from "echarts-for-react";

export default function LineMixBar({ xdata, sales, revenue }) {
  const options = {
    color: ["#008FFB", "#023e8a"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      data: ["Sales", "Revenue in Rs."],
      top: "90%",
    },
    grid: {
      left: "6%",
      right: "5%",
      bottom: "15%",
      top: "15%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: xdata,
        axisPointer: {
          type: "shadow",
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Sales",
        nameLocation: "middle",
        nameTextStyle: {
          padding: [20, 20, 35, 20], //trbl
          verticalAlign: "bottom",
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        type: "value",
        name: "Revenue",
        nameLocation: "middle",
        nameTextStyle: {
          padding: [40, 20, 20, 20], //trbl
          verticalAlign: "top",
        },
        axisLabel: {
          formatter: function (value) {
            if (value >= 10000000) {
              return `₹${(value / 10000000).toFixed(1)}Cr`;
            } else if (value >= 100000) {
              return `₹${(value / 100000).toFixed(1)}L`;
            } else {
              return `₹${value.toLocaleString("en-IN")}`;
            }
          },
        },
      },
    ],
    series: [
      {
        name: "Sales",
        type: "bar",
        tooltip: {
          valueFormatter: function (value) {
            return value;
          },
        },
        data: sales,
      },
      {
        name: "Revenue in Rs.",
        type: "line",
        yAxisIndex: 1,
        label: {
          show: true,
          position: "top",
          formatter: function (value) {
            return `${value.value.toLocaleString("en-IN")}`;
          },
          backgroundColor: "#023e8a",
          borderColor: "#fff",
          borderWidth: 1.5,
          borderRadius: [5, 5, 5, 5],
          color: "#fff",
          padding: [3, 3, 3, 3],
          align: "center",
          verticalAlign: "bottom",
        },
        lineStyle: {
          color: "#023e8a",
        },
        tooltip: {
          valueFormatter: function (value) {
            return `${value.toLocaleString("en-IN")}`;
          },
        },
        data: revenue,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: 310, zIndex: 10 }} />;
}
