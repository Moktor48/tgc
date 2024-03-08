"use client";
import React from "react";
type DataType = Record<string, string | number | bigint>;

export default function DataDisplayPage({ data }: { data: DataType[] }) {
  if (data.length === 0 ?? !data) {
    return <div>No data to display</div>;
  }

  return (
    <div className="w-full">
      <table className="newscolor mx-auto w-1/3">
        <thead>
          <tr>
            {data[0] &&
              Object.keys(data[0]).map((header) => {
                return <th key={header}>{header}</th>;
              })}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            return (
              <tr key={rowIndex}>
                {Object.values(row).map((value, index) => {
                  return (
                    <td key={index} className="text-center">
                      {typeof value === "bigint" ? value.toString() : value}
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
