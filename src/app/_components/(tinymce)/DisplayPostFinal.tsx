import React from "react";
import TinyMCEDisplay from "./TinyMCEDisplay";
import type { DisplayType } from "~/type";

export default function DisplayPostFinal({
  data,
  params,
}: {
  data: DisplayType;
  params: Record<string, string>;
}) {
  if (!data) return <p>No Data!</p>;

  return (
    <div>
      <TinyMCEDisplay data={data} />
    </div>
  );
}
