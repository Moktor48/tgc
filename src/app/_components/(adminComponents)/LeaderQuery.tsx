"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeaderQuery({
  startDate,
  endDate,
  id,
}: {
  startDate: string;
  endDate: string;
  id: string;
}) {
  const router = useRouter();
  const [queryDate, setQueryDate] = useState({
    start: startDate,
    end: endDate,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      `/dashboard/${id}/staff/leaderboard?start=${queryDate.start}&end=${queryDate.end}`,
    );
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="start"
            value={queryDate.start}
            onChange={(event) =>
              setQueryDate({ ...queryDate, start: event.target.value })
            }
          />
          <input
            type="date"
            name="end"
            value={queryDate.end}
            onChange={(event) =>
              setQueryDate({ ...queryDate, end: event.target.value })
            }
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}
