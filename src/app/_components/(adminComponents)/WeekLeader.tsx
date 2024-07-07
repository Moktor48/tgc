import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function WeekLeader(params: { id: string }) {
  const session = await getServerAuthSession();
  if (!session) return <p className="text-yellow-500">You need to log in</p>;
  const id = params.id;
  if (!id) return <p className="text-red-500">Invalid ID</p>;
  const admin = await api.get.staffPermission.query({ userId: id });
  if (!admin) return <p className="text-red-500">Invalid Permissions</p>;

  const today = new Date();
  const currentDayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

  // Adjust today's date to get to the previous Sunday
  const start = new Date(today);
  start.setDate(today.getDate() - 6 - currentDayOfWeek); // If today is Sunday, currentDayOfWeek is 0, so no change
  start.setUTCHours(0, 0, 0, 0); // Set start time to midnight

  // Calculate the end date (Saturday) by adding 6 days to the start date
  const end = new Date(start);
  end.setDate(start.getDate() + 5);
  end.setUTCHours(23, 59, 59, 999); // Set end time to just before midnight

  return (
    <div className="p-15 flex h-full items-center justify-center text-white">
      <div className="newsletter card flex w-2/3 w-96 items-center justify-center border-4 border-black shadow-xl">
        <Link
          href={`/dashboard/${id}/staff/leaderboard/currentLB?start=${start.toISOString()}&end=${end.toISOString()}`}
        >
          <button className="button-40">Current Weekly Leaderboard</button>
        </Link>
      </div>
    </div>
  );
}

/*
Determine time/date/day of week right now. 
Count days back to the last Friday
Set the end date to that Friday, 0400 UTC
Set the start date to the Friday before that, 0400 UTC
All other code should be ready to draw that information 
*/
