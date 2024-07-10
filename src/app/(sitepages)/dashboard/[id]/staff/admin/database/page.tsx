import React from "react";
import UserSearch from "~/app/_components/(adminComponents)/UserSearch";

export default function page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div>
      <h1>Database Interactions</h1>
      <div>
        <h1 className="text-yellow-500">Grant Admin Access</h1>
        <UserSearch id={id} />
      </div>
      <div>
        <h1>Point Adjustment</h1>
      </div>
      <div>
        <h1>Common Query</h1>
      </div>
    </div>
  );
}
