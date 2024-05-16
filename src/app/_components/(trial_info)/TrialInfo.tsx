"use client";
import Link from "next/link";
import React, { useState } from "react";
import GenInfo from "./GenInfo";
import TankInfo from "./TankInfo";
import HealInfo from "./HealInfo";
import DpsInfo from "./DpsInfo";

export default function TrialInfo() {
  const roles = ["all", "tank", "heal", "dps"];
  const [role, setRole] = useState<string | undefined>("all");

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex">
        <button className="button-40" onClick={() => setRole(roles[0])}>
          Basic
        </button>
        <button className="button-40" onClick={() => setRole(roles[1])}>
          Tank
        </button>
        <button className="button-40" onClick={() => setRole(roles[2])}>
          Healer
        </button>
        <button className="button-40" onClick={() => setRole(roles[3])}>
          DPS
        </button>
      </div>
      <br />
      {role === "all" && <GenInfo />}
      {role === "tank" && <TankInfo />}
      {role === "heal" && <HealInfo />}
      {role === "dps" && <DpsInfo />}
    </div>
  );
}
