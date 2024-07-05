"use client";
import "chart.js/auto";
import React from "react";
import { Pie } from "react-chartjs-2";
type DataType = Record<string, string | number | null>;
type Props = {
  dataset: DataType[];
  title: string;
};

export default function PieChart(props: Props) {
  const title = props.title;
  const dataset = props.dataset;

  const data = {
    labels: dataset.map((item) => item.task),
    datasets: [
      {
        data: dataset.map((item) => item.points),
        backgroundColor: [
          "#FF0000",
          "#FF7F00",
          "#FFFF00",
          "#7FFF00",
          "#00FF00",
          "#00FF7F",
          "#00FFFF",
          "#007FFF",
          "#0000FF",
          "#7F00FF",
        ],
      },
    ],
  };

  return (
    <div key={title} className="bg-slate-900">
      {title}
      <Pie data={data} />
    </div>
  );
}
