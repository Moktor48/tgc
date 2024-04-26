import React from "react";
import RaidEntry from "~/app/_components/(adminComponents)/RaidEntry";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page() {
  const session = await getServerAuthSession();
  if (!session) return <p className="text-red-500">Unauthorized</p>;
  const userId = session.user.id;
  const permissions = await api.get.fullProfile.query({
    userId: userId,
  });
  if (!permissions?.eso?.raidlead && !permissions?.staff?.admin)
    return <p className="text-red-500">Unauthorized</p>;
  const trialLeaders = await api.get.trialLeader.query();
  const raiders = await api.get.raiders.query();
  const trials = await api.get.trials.query();
  return (
    <div>
      <h1>TGC Entry System - Trials (TEST)</h1>
      <RaidEntry
        leaders={trialLeaders}
        raiders={raiders}
        trials={trials}
        userId={userId}
      />
    </div>
  );
}
/**
NOTES:
Entry for raids
Person who enters the info
Name list?
Should it pull raiders only?
Select menu pulls raiders
Select menu pulls raid leaders
Search for members not in the system

Entry for new raiders, raid leaders can add
Ask Chance if there are guest raiders or if tag is required


page link + page check = raid leader permissions
SELECT: Leader
Default: logged-in member
Select: All members with RL tag

onChange: Adds leader to list
ALLOW: Multiple leaders, 1 primary

SELECT: Member
Default: Please select...
Select: All members with raid tag

onChange: Adds member to list

SELECT: Trial
Default: Please select... 
Select: Trial list (hard code or pull from DB)

Checkbox: Modifier - hard mode 
Checkbox: Modifier - veteran
Checkbox: Modifier - no death
Checkbox: Modifier - speed run
Checkbox: Modifier - No buffs* 


 * 
 */
