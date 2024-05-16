"use client";
import React, { useState } from "react";
import GenInfoCore from "./GenInfoCore";
import TierInfo from "./TierInfo";

export default function GenInfo() {
  const pages: string[] = ["core", "tier", "heal", "tank"];
  const [page, setPage] = useState<string | undefined>("core");
  return (
    <div className="flex w-full flex-col items-center">
      <div className="newsletter override-flex-direction flex w-2/3 flex-row">
        <button className="button-40 w-1/5" onClick={() => setPage(pages[0])}>
          Basic Information
        </button>
        <button className="button-40 w-1/5" onClick={() => setPage(pages[1])}>
          Tiers
        </button>
        <button className="button-40 w-1/5" onClick={() => setPage(pages[2])}>
          Healer
        </button>
        <button className="button-40 w-1/5" onClick={() => setPage(pages[3])}>
          DPS
        </button>
      </div>
      {page === "core" && <GenInfoCore />}
      {page === "tier" && <TierInfo />}
    </div>
  );
}
