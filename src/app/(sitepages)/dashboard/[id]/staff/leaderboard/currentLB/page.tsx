import React from "react";
import WeekLeader from "~/app/_components/(adminComponents)/WeekLeader";

export default function CurrentLB({ params }: { params: { id: string } }) {
  return <WeekLeader id={params.id} />;
}
