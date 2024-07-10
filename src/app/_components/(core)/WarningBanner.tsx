import React from "react";

export default function WarningBanner() {
  return (
    <div className="bg-black text-center text-3xl text-red-500">
      <p className="text-3xl text-yellow-500">
        Latest update: <span className="test-green-500 text-3xl">7/10/24</span>
      </p>

      <h1>Latest updates</h1>
      <ul>
        <li>Pre-Drizzle conversion</li>
        <li>
          Bug reporting! Check your dashboard, report bugs, suggestions, or...
          whatever...?
        </li>
        <li>
          Editor no longer allows guides or builds for the general guild, those
          are aimed at specific games now
        </li>
        <li>Editor is online... again! Dashboard, staff, create post.</li>
        <li>
          *Leaderboard should give accurate results based on the times currently
          being "EDT"
        </li>
        <li>*Staff tracker force-saves in EDT, all times should match now</li>
      </ul>
    </div>
  );
}
