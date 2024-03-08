"use client";
import React from "react";
interface PaginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export default function Pagination({
  nPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav className="flex w-full flex-row bg-slate-800 text-center">
      <ul className="pagination justify-content-center w-full">
        <li
          className="page-item pointer inline max-w-fit p-1"
          onClick={goToPrevPage}
        >
          Previous
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item pointer inline max-w-5 shrink p-1 ${currentPage == pgNumber ? "active" : ""} `}
            onClick={() => setCurrentPage(pgNumber)}
          >
            {pgNumber}
          </li>
        ))}
        <li
          className="page-item pointer inline max-w-fit p-1"
          onClick={goToNextPage}
        >
          Next
        </li>
      </ul>
    </nav>
  );
}

/*
"use client";
import React from "react";
interface PaginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}
export default function Pagination({
  nPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <nav className="flex w-full flex-row bg-slate-800 text-center">
      <ul className="pagination justify-content-center w-full">
        <li className="page-item inline max-w-fit p-1">
          <a className="page-link" onClick={goToPrevPage} href="#">
            Previous
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item inline max-w-5 shrink p-1 ${currentPage == pgNumber ? "active" : ""} `}
          >
            <a
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
              href="#"
            >
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item inline max-w-fit p-1">
          <a className="page-link" onClick={goToNextPage} href="#">
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
}
*/
