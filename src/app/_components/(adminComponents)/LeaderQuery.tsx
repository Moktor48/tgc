"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeaderQuery({ id }: { id: string }) {
  const d = new Date();
  const start = d.setDate(d.getDate() - 6);
  const startDate = new Date(start).toISOString().split("T")[0]!;
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
        <form onSubmit={handleSubmit}>
          <label className="mr-10" htmlFor="start">
            Start Date
          </label>
          <input
            className="text-white"
            type="datetime"
            name="start"
            value={queryDate.start}
            onChange={(event) => {
              setQueryDate({ ...queryDate, start: event.target.value });
            }}
          />
          <br />

          <label className="mr-10" htmlFor="end">
            End Date
          </label>

          <input
            className="text-white"
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
