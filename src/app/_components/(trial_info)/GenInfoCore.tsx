import Link from "next/link";
import React from "react";

export default function GenInfoCore() {
  return (
    <div className="newsletter flex w-2/3 flex-col">
      <h1 className="text-center text-3xl underline">
        General Information for Trials
      </h1>
      <br />
      <div>
        <h1>Interested in raiding with TGC?</h1>
        <br />
        <p>
          Great! We are organized by raider tiers, which are detailed below.
        </p>
        <br />
        <p>
          The way this works: Using{" "}
          <Link
            className="text-yellow-500 underline"
            href="https://www.esoui.com/downloads/info1360-CombatMetrics.html"
          >
            Combat Metrics
          </Link>{" "}
          (parses) and{" "}
          <Link
            className="text-yellow-500 underline"
            href="https://www.esoui.com/downloads/info2892-PithkasAchievementTracker.html"
          >
            Pithka's Achievement Tracker
          </Link>{" "}
          (clears), players submit screenshots to{" "}
          <Link
            className="text-yellow-500 underline"
            href="https://discordapp.com/channels/314436945792991232/518537117198974976"
          >
            ⁠clears-and-parses
          </Link>{" "}
          to then receive tags according to what they submit. Support roles need
          to also submit inventory screenshots of the gear listed below as
          "required" for that role. We recommend using{" "}
          <Link
            className="text-yellow-500 underline"
            href="https://www.esoui.com/downloads/info3326-DescendantsSupportSetTracker.html"
          >
            Descendant's Support Set Tracker
          </Link>{" "}
          addon for gears to make it easier on you and us.
        </p>
        <br />
        <p>The Training Council (TNC) ranks are based on tier 1-3.</p>
        <p>The Gaming Council Main Guild (TGC1) ranks are based on tier 4+</p>
        <p>The Gaming Council II (TGC2) verified rank is Tier 1+</p>{" "}
        <p>The Gaming Council V (TGC5) has a tier 1-3 rank and tier 4+ rank</p>{" "}
        <br />
        <p>
          If you still have questions how this process works, reach out to our
          staff via a DM to @Engineer_Karl, or post in{" "}
          <Link
            className="text-yellow-500 underline"
            href="https://discordapp.com/channels/314436945792991232/444093808465149952"
          >
            ⁠help-channel
          </Link>{" "}
          or ⁠
          <Link
            className="text-yellow-500 underline"
            href="https://discordapp.com/channels/314436945792991232/1037166468774772786"
          >
            academy
          </Link>
        </p>
      </div>
    </div>
  );
}
