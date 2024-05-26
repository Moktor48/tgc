"use client";
import React from "react";
import { performanceData, rankList } from "../(core)/coreData";
type DataType = Record<string, string | number | null>;
type PerformanceType =
  | Record<string, Record<string, number> | undefined>
  | undefined;

export default function DataDisplayPage({
  records,
  checkBox,
}: {
  records: DataType[];
  checkBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  if (records.length === 0 ?? !records) {
    return <div>No data to display</div>;
  }
  console.log("Record:", records[0]);

  function standardCheck(rank: string, points: number) {
    const rankName = rankList[rank]!;
    const performance: PerformanceType = performanceData.find(
      (p) => Object.keys(p)[0] === rankName,
    );
    console.log("Performance:", performance);
    if (!performance) return null;

    const { promote, expected, poor } = performance[rankName]!;
    console.log("Promote:", promote, "Expected:", expected, "Poor:", poor);
    if (points >= promote!) {
      return <p className="text-green-500">Exceeds Expectations</p>;
    } else if (points >= expected!) {
      return <p className="text-white">Meets Expectations</p>;
    } else if (points >= poor!) {
      return <p className="text-yellow-500">Below Expectations</p>;
    } else if (
      rank === "Guild Master" ||
      rank === "High Council" ||
      rank === "Council"
    ) {
      return <p className="text-red-500">Inactive</p>;
    } else {
      return <p className="text-red-500">Probation</p>;
    }
  }

  return (
    <div className="w-full">
      <table className="newscolor mx-auto w-2/3">
        <thead>
          <tr>
            <th>Select User</th>
            <th>Name</th>
            <th>Points</th>
            <th>Rank</th>
            <th>Standards</th>
          </tr>
        </thead>
        {/*Row Index should be the gmember_id */}

        <tbody>
          {records.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} className="w-full">
                <td className="flex justify-center">
                  <input
                    type="checkbox"
                    className="mt-1"
                    id={row.user_name?.toString() ?? ""}
                    onChange={checkBox}
                  ></input>
                </td>

                <td>{row.user_name}</td>
                <td>{row.points}</td>
                <td>{row.rank}</td>
                <td>
                  {standardCheck(
                    row.rank?.toString() ?? "",
                    row.points ? Number(row.points) : 0,
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/*

data formatting

[{k: v, k: v}]
The key should be the header of the table, so name appropriately
The value should be the data to be displayed in the table



Try to avoid nesting data when passed to this page

data.length()

---Determining the size of the data objects inside the array to scale the table ---
  let size = 0;
  if (data[0]) {
    size = Object.keys(data[0]).length;
  }
  console.log(size);



  map twice, once for the headers, once for the data
*/
