"use client";
import React, { useState } from "react";

export default function RaidEntry({
  userId,
  leaders,
  raiders,
  trials,
}: {
  userId: string;
  leaders: {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string;
    role: string;
    tgc_guild_member: boolean;
  }[];
  raiders: {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string;
    role: string;
    tgc_guild_member: boolean;
  }[];
  trials: {
    trial_name: string;
    base_value: number;
    hard_mode: number;
    veteran: number;
  }[];
}) {
  const defaultLeader = leaders.find((leader) => leader.id === userId);
  const [leader, setLeader] = useState({defaultLeader.name});
  const [member, setMember] = useState([]);
  const [trial, setTrial] = useState("");
  const [modifiers, setModifiers] = useState({
    hardMode: false,
    veteran: false,
    noDeath: false,
    speedRun: false,
    noBuffs: false,
  });
  return (
    <div>
      <form>
        <select>
          <option value={trial}>Please select...</option>
          {trials.map((trial) => (
            <option key={trial.trial_name} value={trial.trial_name}>
              {trial.trial_name}
            </option>
          ))}
        </select>
        <select>
          <option value={leader}>Please select...</option>
          {leaders.map((leader) => (
            <option key={leader.id} value={leader.id}>
              {leader.name}
            </option>
          ))}
        </select>
        <select>
          <option value="">Please select...</option>
          {raiders.map((raider) => (
            <option key={raider.id} value={raider.id}>
              {raider.name}
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
