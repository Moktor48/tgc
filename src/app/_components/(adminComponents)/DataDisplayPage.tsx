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

  function standardCheck(rank: string, points: number) {
    const rankName = rankList[rank]!;
    const performance: PerformanceType = performanceData.find(
      (p) => Object.keys(p)[0] === rankName,
    );

    if (!performance) return null;

    const { promote, expected, poor } = performance[rankName]!;

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
      <table className="newscolor mx-auto w-2/3 text-center">
        <thead>
          <tr>
            <th>Select User</th>
            <th>Name</th>
            <th>Points</th>
            <th>Rank</th>
            <th>Performance</th>
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
