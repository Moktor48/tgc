import React from "react";

export default function WarningBanner() {
  return (
    <div className="bg-black text-center text-3xl text-red-500">
      <p className="text-3xl text-yellow-500">
        Latest update: <span className="test-green-500 text-3xl">5/6/24</span>
      </p>

      <h1>Latest updates</h1>
      <p>
        1. Staff Tracker should parse txt files and enter to database with
        correct times.
      </p>
      <p>
        2. Leaderboard should reflect data based on date range: It is now set to
        default to 0400 UTC
      </p>
      <p>
        If you set your date randge for 1/1/2024 to 1/7/2024 it will pull
        records for
      </p>
      <p>
        1/1/2024 at 0400 to 1/8/2024 at 0359, ensuring everyone gets the same
        data regardless of timezone
      </p>
      <p>
        Staff Tracker/Database clean-up, more details in the leaderboard query
      </p>
      <p>
        3. User creator removed, permission modifications are now set to only
        change ADMIN privileges
      </p>
    </div>
  );
}
