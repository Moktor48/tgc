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
  const day = today.getDay();
  const diff = day >= 6 ? day - 6 : 5 + (7 - day); // calculate the difference to the last Friday
  today.setDate(today.getDate() - diff); // subtract the difference from today's date
  const end = today;
  const start = new Date(end);
  start.setDate(end.getDate() - 7);
  start.setUTCHours(4, 0, 0, 0); // Set the time to 04:00:00.000Z
  end.setUTCHours(3, 59, 59, 999); // Set the time to 03:59:59.999Z

  return (
    <div className="flex justify-center text-white">
      <div className="newsletter w-2/3">
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
