import React from "react";

export default function WarningBanner() {
  return (
    <div className="bg-black text-center text-3xl text-red-500">
      <p className="text-3xl text-yellow-500">
        Latest update: <span className="test-green-500 text-3xl">7/6/24</span>
      </p>

      <h1>Latest updates</h1>
      <ul>
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
