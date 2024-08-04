import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page() {
  const session = await getServerAuthSession();
  if (!session) return <p>Unauthorized</p>;
  const raidData = await api.get.trials.query();
  return (
    <div>
      <h1>Raid Stats Page</h1>
      {raidData.map((raid) => (
        <div key={raid.raid_uid}>
          <h2>
            {raid.trial_name} led by {raid.gmember_id}
          </h2>
          <h2>Attendance</h2>
          {raid.attend.map((attend) => (
            <div key={attend.gmember_id}>
              <p>{attend.gmember_id}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
