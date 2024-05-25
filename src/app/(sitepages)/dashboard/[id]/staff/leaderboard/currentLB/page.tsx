import React from "react";
import PointCalc from "~/app/_components/(adminComponents)/PointCalc";
import { getServerAuthSession } from "~/server/auth";
export default async function CurrentLB({
  searchParams,
}: {
  searchParams: { start: string; end: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return <p className="text-yellow-500">You need to log in</p>;
  const start = new Date(searchParams.start);
  const end = new Date(searchParams.end);
  return (
    <div>
      <PointCalc startD={start.toISOString()} endD={end.toISOString()} />
    </div>
  );
}
