import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function WeekLeader() {
  const session = await getServerAuthSession();
  if (!session) return <p className="text-yellow-500">You need to log in</p>;
  const id = params.id;
  if (!id) return <p className="text-red-500">Invalid ID</p>;
  const admin = await api.get.staffPermission.query({ userId: id });
  if (!admin) return <p className="text-red-500">Invalid Permissions</p>;

  return (
    <div className="flex justify-center">
      <div className="newsletter w-2/3">
        <p>This component will generate the final leaderboard for each week.</p>

        <pre>
          {`Guild Specialist:
   Expected: 500 <= x
   Promotable: Avg. 750 <= x
   Poor Performance: x < 350
   Auto-Probation: x < 180
Junior Guild Officer:
   Expected: 700 <= x
   Promotable: Avg. 1000 <= x
   Poor Performance: x < 600
   Auto-Probation: x < 350
Guild Officer:
   Expected: 750 <= x
   Poor Performance: x < 600
   Auto-Probation: x < 400
Senior Officer:
   Expected: 1000 <= x
   Poor Performance: x < 750
   Auto-Probation: x < 500

Performance evaluated once monthly. 
Staff consistently in "Poor Performance" averages are considered for demotion one step down.
Staff with "Promotable" averages are considered for promotion one step up. 
GO+ promotions are based on more than points.`}
        </pre>
      </div>
    </div>
  );
}
