"use client";
import React from "react";
import { useState } from "react";
import PieChart from "~/app/_components/(adminComponents)/PieChart";
import DataWrapper from "~/app/_components/(adminComponents)/DataWrapper";
import LeaderPointStandard from "./LeaderPointStandard";

type DataType = Record<string, string | number | null>;
type Props = {
  rankedList: DataType[];
  chartData: DataType[];
  rawData: DataType[];
  startDate: string;
  endDate: string;
};
type CheckedItem = {
  id: string;
  isChecked: boolean;
};
type PieProps = {
  dataset: DataType[];
  title: string;
};
interface Point {
  points: number;
  task: string;
}
export default function LBClientWrap({
  rankedList,
  chartData,
  rawData,
  startDate,
  endDate,
}: Props) {
  //Basic Pie Chart with overall display when first loaded
  const [pie, setPie] = useState([
    <PieChart title={"Points Earned by Staff"} dataset={chartData} />,
  ]);
  const [pointStand, setPointStand] = useState(false);
  const [checked, setChecked] = useState<CheckedItem[]>([]);
  // Code to add additional charts based on selecting a member
  // Props here will be an array of objects with a key: value pairing, sorted data should be x:y values
  const addChart = (props: PieProps) => {
    setPie((prevPie) => {
      // Check if a <PieChart> with the same props already exists
      if (
        !prevPie.find(
          (chart) => JSON.stringify(chart.props) === JSON.stringify(props),
        )
      ) {
        // If not, add a new <PieChart>
        return [...prevPie, <PieChart {...props} />];
      }
      // If a <PieChart> with the same props already exists, return the previous state
      return prevPie;
    });
  };

  // Sort functions
  const checkBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      const index = newChecked.findIndex((item) => item.id === e.target.id);

      if (index !== -1) {
        // Update the isChecked property of the existing item
        newChecked[index]!.isChecked = e.target.checked;
      } else {
        // Add a new item to the array
        newChecked.push({ id: e.target.id, isChecked: e.target.checked });
      }

      return newChecked;
    });
  };

  // This adds indivdual stats in, and is likely the starting point to collate distributed information
  const compare = () => {
    const user = [] as string[];
    checked.forEach((element) => {
      if (!element.isChecked) {
        setPie((prevPie) =>
          prevPie.filter(
            (chart: { props: { title: string } }) =>
              chart.props.title !== `Points Earned by ${element.id}`,
          ),
        );
      }
      if (element.isChecked) {
        user.push(element.id);
      }
    });
    user.forEach((element) => {
      const userPoints = rawData.filter((data) => data.user_name === element);

      // Push all data into an array
      const pointArray: Point[] = userPoints.map((data) => {
        return {
          points: Number(data.points),
          task: data.task ? data.task.toString() : "",
        };
      });
      // Combines all points earned to parse task points combined
      const taskPoints = pointArray.reduce<Record<string, number>>(
        (acc, point) => {
          if (point.task && point.points) {
            if (acc[point.task]) {
              acc[point.task] += point.points;
            } else {
              acc[point.task] = point.points;
            }
          }
          return acc;
        },
        {},
      );
      const taskPointsArray = Object.entries(taskPoints).map(
        ([task, points]) => ({ task, points }),
      );

      addChart({
        dataset: taskPointsArray,
        title: `Points Earned by ${element}`,
      });
    });
  };

  return (
    <div>
      <div className="flex justify-center">
        {pie.map((chart, index) => (
          <React.Fragment key={index}>{chart}</React.Fragment>
        ))}
      </div>
      <div>
        <h1 className="newscolor text-center">
          Points Earned from {startDate} to {endDate}
        </h1>
        <DataWrapper rankedList={rankedList} checkBox={checkBox} />
      </div>
      <div className="flex justify-center">
        <button className="button-40" onClick={compare}>
          COMPARE SELECTED MEMBERS
        </button>
        <button
          className="button-40"
          onClick={() => setPointStand(!pointStand)}
        >
          Point Standards
        </button>
      </div>
      {pointStand && <LeaderPointStandard />}
    </div>
  );
}
