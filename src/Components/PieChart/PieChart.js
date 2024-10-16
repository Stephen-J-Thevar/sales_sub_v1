import React from "react";
import ReactECharts from "echarts-for-react";

export default function PieChart({ data }) {
  const options = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "80%",
      // left: "center",
    },
    series: [
      {
        type: "pie",
        center: ["50%", "40%"],
        radius: ["30%", "60%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 5,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: true,
          position: "outside",
          formatter: "{c}\n{d}%",
          fontWeight: "bold",
          color: "#000",
          fontSize: 10,
        },
        grid: {
          left: "4%",
          right: "3%",
          bottom: "5%",
          top: "0%",
          containLabel: true,
        },
        emphasis: {
          scale: true,
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
          focus: "self",
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 10,
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        data,
      },
    ],
  };

  return <ReactECharts option={options} style={{ height: 300 }} />;
}
