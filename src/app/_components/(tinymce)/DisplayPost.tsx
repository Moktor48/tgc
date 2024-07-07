import React from "react";
import TinyMCEDisplay from "./TinyMCEDisplay";
import type { DisplayType } from "~/type";

export default function DisplayPost({
  data,
  params,
}: {
  data: DisplayType;
  params: { id: string; postId: string };
}) {
  if (!data) return <p>No Data!</p>;

  return (
    <div>
      <TinyMCEDisplay data={data} />
    </div>
  );
}
