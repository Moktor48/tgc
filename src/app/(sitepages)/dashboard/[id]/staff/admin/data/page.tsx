import React from "react";
import DataCalc from "~/app/_components/(dataTracking)/DataCalc";
import DataWrapper from "~/app/_components/(dataTracking)/DataWrapper";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import type { JoinData } from "~/type";
export default async function page() {
  const session = await getServerAuthSession();
  if (!session) return <p>Log in to access.</p>;
  if (session.user.role !== "admin") return <p>Admin access only.</p>;
  const start = new Date("2024-05-19T00:00:00.000Z");
  console.log("Start:", start);
  const data: JoinData = await api.get.dataQuery.query({ start });

  return (
    <div>
      <DataCalc data={data} />
      <DataWrapper />
    </div>
  );
}
