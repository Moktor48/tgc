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
    <div className="flex justify-center text-white">
      <div className="newsletter w-2/3">
        <h2>Leaderboard Query: Times are not Zulu, they are EDT.</h2>
        <form onSubmit={handleSubmit} className="flex">
          <label className="mr-10 justify-self-start" htmlFor="start">
            Start Date
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
          <br />

          <label className="mr-10 justify-self-start" htmlFor="end">
            End Date
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

          <br />
          <button className="button-40">Submit</button>
        </form>
      </div>
    </div>
  );
}
