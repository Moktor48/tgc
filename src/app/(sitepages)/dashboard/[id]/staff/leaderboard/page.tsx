//This page is a general query for a date range

import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import LeaderQuery from "~/app/_components/(adminComponents)/LeaderQuery";
import WeekLeader from "~/app/_components/(adminComponents)/WeekLeader";

export default async function page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { start: string; end: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return <p className="text-yellow-500">You need to log in</p>;
  const id = params.id;
  if (!id) return <p className="text-red-500">Invalid ID</p>;
  const admin = await api.get.staffPermission.query({ userId: id });
  if (!admin) return <p className="text-red-500">Invalid Permissions</p>;
  const start = new Date(searchParams.start);
  start.setUTCHours(4, 0, 0, 0); // Set the time to 04:00:00.000Z

  const end = new Date(searchParams.end);
  end.setUTCDate(end.getUTCDate() + 1); // Add 1 day
  end.setUTCHours(3, 59, 59, 999); // Set the time to 03:59:59.999Z

  return (
    <>
      <div className="flex justify-center">
        <h1 className="newsletter w-2/3 text-center text-5xl text-white">
          Leaderboard Selection
        </h1>
      </div>
      <LeaderQuery id={id} />
      <WeekLeader id={id} />
    </>
  );
}
