"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeaderQuery({ id }: { id: string }) {
  const d = new Date();
  const start = d.setDate(d.getDate() - 6);
  const startDateX = new Date(start).setUTCHours(0, 0, 0, 0);
  const startDate = new Date(startDateX).toISOString();
  const endDate = new Date().toISOString();
  const router = useRouter();

  const [queryDate, setQueryDate] = useState({
    start: startDate,
    end: endDate,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/dashboard/${id}/staff/leaderboard/currentLB?start=${queryDate.start}&end=${queryDate.end}`,
    );
  };

  return (
    <div className="p-15 flex justify-center text-white">
      <div className="newsletter card w-2/3 w-96 border-4 border-black shadow-xl">
        <h2 className="p-5 text-center">
          Leaderboard Query: Times are not Zulu, they are EDT.
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex justify-between">
            {" "}
            {/* Use div instead of span for block-level container */}
            <label className="justify-self-start" htmlFor="start">
              Start Date:{""}
            </label>
            <input
              className="justify-self-end text-white"
              type="datetime"
              name="start"
              value={queryDate.start}
              onChange={(event) => {
                setQueryDate({ ...queryDate, start: event.target.value });
              }}
            />
          </div>

          <div className="flex justify-between">
            {" "}
            <label className="justify-self-start" htmlFor="end">
              End Date:{""}
            </label>
            <input
              className="justify-self-end text-white"
              type="datetime"
              name="end"
              value={queryDate.end}
              onChange={(event) => {
                setQueryDate({ ...queryDate, end: event.target.value });
              }}
            />
          </div>
          <br />
          <div className="flex w-full justify-center">
            <button className="button-40">Submit</button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
}
