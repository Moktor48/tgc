"use client";
// ./components/PieChart.js
import "chart.js/auto";
import React from "react"; // Import the necessary library such as React for now.
import { Pie } from "react-chartjs-2"; // In the react-chartjs-2 library, import the Pie component.
type DatasetType = { task: string; points: number }[];

export default function PieChart({ dataset }: { dataset: DatasetType }) {
  const cfg = {
    type: "pie",
    data: {
      datasets: [
        {
          data: dataset,
          backgroundColor: ["red", "green", "blue"],
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
        backgroundColor: ["red", "green", "blue"],
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
    <div>
      <Pie data={data} />
    </div>
  );
}
