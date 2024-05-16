import React from "react";
import TrialInfo from "~/app/_components/(trial_info)/TrialInfo";

export default function page() {
  return (
    <div>
      <h1 className="bg-slate-900/70 text-center text-5xl text-white underline">
        How to run ESO trials with TGC!
      </h1>
      <TrialInfo />
    </div>
  );
}
