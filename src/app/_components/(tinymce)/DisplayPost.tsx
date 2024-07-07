import React from "react";
import TinyMCEDisplay from "./TinyMCEDisplay";
import type { DisplayType } from "~/type";

export default function DisplayPost({ data }: { data: DisplayType }) {
  if (!data) return <p>No Data!</p>;

  return (
    <div>
      <TinyMCEDisplay data={data} />
    </div>
  );
}
