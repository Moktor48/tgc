"use client";
import React, { useState } from "react";
import DataDisplayPage from "./DataDisplayPage";
import Pagination from "./Pagination";

type DataType = Record<string, string | number | bigint>;

export default function DataWrapper({ data }: { data: DataType[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(data.length / recordsPerPage);
  return (
    <div>
      <DataDisplayPage data={currentRecords} />
      <Pagination
        nPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
