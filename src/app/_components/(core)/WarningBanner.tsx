import React from "react";

export default function WarningBanner() {
  return (
    <div className="bg-black text-center text-3xl text-red-500">
      <p className="text-3xl text-yellow-500">
        Latest update: <span className="test-green-500 text-3xl">5/16/24</span>
      </p>

      <h1>Latest updates</h1>
      <p>
        Session bug fixed, should be able to log in from multiple sites now.
      </p>
      <p>
        Added Raid information to inform... this is not yet formatted, I am just
        bringing the data over and beautifying as I can.
      </p>
    </div>
  );
}
