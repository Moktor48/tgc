"use client";
import React, { useState } from "react";
import LoadDump from "./LoadDump";
import RaidEntry from "./RaidEntry";
import type { Session } from "next-auth";

export default function RaidWrap({
  userId,
  session,
}: {
  userId: string;
  session: Session;
}) {
  const [loadTrials, setLoadTrials] = useState(false);
  return (
    <div>
      <h1>RAID ENTRY SYSTEM</h1>

      <RaidEntry userId={userId} session={session} />
      <br />
      <label className="text-red-500">
        Load Trial Names? Ignore this unless you know you need it!
        <input
          checked={loadTrials}
          type="checkbox"
          onChange={() => setLoadTrials(!loadTrials)}
        ></input>
      </label>
      {loadTrials && <LoadDump />}
    </div>
  );
}
