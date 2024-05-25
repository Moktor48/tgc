"use client";
import React from "react";
type DataType = Record<string, string | number | null>;

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

  return (
    <div className="w-full">
      <table className="newscolor mx-auto w-2/3">
        <thead>
          <tr>
            <th>Select User</th>
            <th>Name</th>
            <th>Points</th>
            <th>Rank</th>
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
                    id={row.user_name?.toString()}
                    onChange={checkBox}
                  ></input>
                </td>

                {Object.values(row).map((value, index) => {
                  return (
                    <td key={index} className="text-center">
                      {value}
                    </td>
                  );
                })}
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
