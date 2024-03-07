//Page for staff members, will include portals to staff related pages.
import Link from "next/link";
import React from "react";
import LeaderQuery from "~/app/_components/(adminComponents)/LeaderQuery";
import UserSearch from "~/app/_components/(adminComponents)/UserSearch";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function StaffPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const id = params.id;
  const perm = await api.get.staffPermission.query({ userId: id });
  if (session.user.role != "staff")
    return (
      <p className="text-3xl text-white">
        You are not authorized to view this page
      </p>
    );
  const d = new Date();
  const e = new Date();
  const start = d.setDate(d.getDate() - 7);
  const end = e.setDate(e.getDate() + 1);
  const startDate = "2023-11-01"; //new Date(start).toISOString().split("T")[0]!;
  const endDate = "2023-12-01"; //new Date(end).toISOString().split("T")[0]!;
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2">
          <p>
            Clearly you are a staff member, {session?.user.name}, permissions
            include {perm?.specialist && "specialist "}{" "}
            {perm?.representative && "representative "}{" "}
            {perm?.admin && "admin "} {perm?.highcouncil && "high council "}{" "}
            {perm?.guildmaster && "guildmaster"}.
          </p>
          <p>Custom Page for officers</p>
          <p>Guild breakdown for this officer</p>
          <p>Ability to adjust ranks for players in same guild</p>
          <p>Ability to create and modify events for guild</p>
          <p>Ability to make guild page announcements</p>
          <LeaderQuery startDate={startDate} endDate={endDate} id={id} />
          <Link href={`/dashboard/${id}/staff/leaderboard`}>Leaderboard</Link>
          <UserSearch id={id} />
          <Link href={`../../../editor/${id}/approve`}>
            <span className="text-3xl text-yellow-500">Post Approvals</span>
          </Link>
        </div>
      </div>
    </>
  );
}
