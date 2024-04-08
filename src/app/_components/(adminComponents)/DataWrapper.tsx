"use client";
import React, { useState } from "react";
import DataDisplayPage from "./DataDisplayPage";
import Pagination from "./Pagination";

type DataType = Record<string, string | number | null>;

export default function DataWrapper({
  checkBox,
  rankedList,
}: {
  rankedList: DataType[];
  checkBox: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 20;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = rankedList.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );
  const totalPages = Math.ceil(rankedList.length / recordsPerPage);
  return (
    <div>
      <DataDisplayPage records={currentRecords} checkBox={checkBox} />
      <Pagination
        nPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
