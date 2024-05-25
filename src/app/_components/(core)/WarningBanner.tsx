import React from "react";

export default function WarningBanner() {
  return (
    <div className="bg-black text-center text-3xl text-red-500">
      <p className="text-3xl text-yellow-500">
        Latest update: <span className="test-green-500 text-3xl">5/25/24</span>
      </p>

      <h1>Latest updates</h1>
      <ul>
        <li>Added rank to the leaderboard to prep for point comparisons</li>
        <li>Fixed the timezone issue for Snapshots</li>
        <li>
          Set a fixed time period for leaderboard queries (Sunday 0400-Sunday
          0400 UTC. Clicking the "Current" button will give the latest,
          locked-in points.)
        </li>
        <li>
          Session bug fixed, should be able to log in from multiple sites now.
        </li>
        <li>
          Added Raid information to inform... this is not yet formatted, I am
          just bringing the data over and beautifying as I can.
        </li>
      </ul>
    </div>
  );
}
