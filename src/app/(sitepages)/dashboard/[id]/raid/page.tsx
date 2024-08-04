import React from "react";
import RaidWrap from "~/app/_components/(raid_entry)/RaidWrap";
import { getServerAuthSession } from "~/server/auth";

export default async function page({ params }: { params: { id: string } }) {
  const userId = params.id;
  const session = await getServerAuthSession();
  return (
    <div>
      <RaidWrap userId={userId} session={session} />
    </div>
  );
}
/*
NOW---
Leader: params.id
Game: Add later, this can be a simple state change for a form
Type: (Dungeon, Trial, Event) 
Location: (specify WHICH trial/dungeon) <select> from all options
MODIFIERS-
Veteran?: (yes/no) <checkbox>
Hard Mode?: May require dung/trial input for number of HMs
Difficulty options: (Trifecta[select], Score[input direct], Vitality[1-36, can select or simply validate direct input])
Date/Time Start: (date/time) <datetime>
Date/Time End: (date/time) <datetime>
Clears: (number) <number>
Wipes: (number) <number>
Attendees (3-23 + leader): COMPLEX: Has to access all users in Discord, so having a search function is essential here
GAME: SWTOR/FFXIV added next (TBD)
Point Calculation: difficulty mod will multiply point base, or Chance can hand-jam ALL point possibilities. Be flexible here.
Tie to staff_duty, should be np

LATER---
SWTOR Notes:
Eternity Vault (EV)
Karagga's Palace (KP)
Explosive Conflict (EC)
Xenoanalyst II (xeno)‡†
Toborro's Courtyard (TC)‡
Terror from Beyond (TFB)
Scum and Villainy (SnV)
The Dread Fortress (DF)
The Dread Palace (DP)
The Eyeless (eyeless)‡†
Colossal Monolith (CM)‡
The Ravagers (Rav)
Temple of Sacrifice (ToS)
Gods From the Machine (Gods)
Hive of the Mountain Queen (Queen)*
Nature of Progress (Dxun)
R-4 Anomaly (R4)

FFXIV: I'll deal with that later
*/
