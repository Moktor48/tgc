"use client";
// ./components/PieChart.js
import "chart.js/auto";
import React from "react"; // Import the necessary library such as React for now.
import { Pie } from "react-chartjs-2"; // In the react-chartjs-2 library, import the Pie component.
import { Colors } from "chart.js";
import { Chart } from "react-chartjs-2";
type DatasetType = { task: string; points: number }[];

export default function PieChart({ dataset }: { dataset: DatasetType }) {
  const cfg = {
    type: "pie",
    data: {
      datasets: [
        {
          data: dataset,
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
      labels: ["Red", "Green", "Blue"],
    },
    options: {
      parsing: {
        xAxisKey: "dataset\\.task",
        yAxisKey: "dataset\\.points",
      },
      responsive: true,
    },
  };

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
  /*
  // Define an array of labels.
  const labels = ["January", "February", "March", "April", "May", "June"];

  // Defined an object.
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(0,0,255)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  /**
   * Define a functional component named PieChart
   * that returns a Pie component from react-chartjs-2,
   */

  return (
    <div className="w-full">
      <div className="m-auto w-1/3 bg-slate-900">
        <Pie data={data} />
      </div>
    </div>
  );
}
