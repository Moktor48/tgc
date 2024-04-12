import React from "react";

export default function WarningBanner() {
  return (
    <div className="bg-black text-center text-3xl text-red-500">
      <p className="text-yellow-500">
        Latest update: <span className="test-green-500">4/12/24@1500MST</span>
      </p>

      <h1>Latest updates</h1>
      <p> Near total rebuild, back to TinyMCE</p>
      <p> What WORKS?</p>
      <p>Adding staff tracker files will parse and go to database</p>
      <p>Leaderboard is tracking</p>
      <p>Modding member permissions are back in</p>
      <p>Editor ahould function, to write and save posts to database</p>
      <p>What DOESN'T work?</p>
      <p>Editor approvals and display are coming son</p>
    </div>
  );
}
