import React from "react";
import TrialParser from "~/app/_components/(trial_parser)/TrialParser";
import { getServerAuthSession } from "~/server/auth";
export default async function page() {
  const session = await getServerAuthSession();
  if (!session) return <p className="text-red-500">Unauthorized</p>;

  return (
    <div>
      <h1>TGC Entry System - Trials (TEST)</h1>
      <TrialParser />
    </div>
  );
}
