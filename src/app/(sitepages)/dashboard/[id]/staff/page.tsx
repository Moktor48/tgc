//Page for staff members, will include portals to staff related pages.
import Link from "next/link";
import React from "react";
import UserSearch from "~/app/_components/(adminComponents)/UserSearch";
import NavBarDB from "~/app/_components/(gameComponents)/(dashboard)/NavBarDB";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function StaffPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  console.log(session);
  const id = params.id;
  const perm = await api.get.staffPermission.query({ userId: id });
  if (session.user.role != "staff")
    return (
      <p className="text-3xl text-white">
        You are not authorized to view this page
      </p>
    );

  return (
    <>
      <NavBarDB id={id} perm={perm} />
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

          <UserSearch />
          <Link href={`../../../editor/${id}/approve`}>
            <span className="text-3xl text-yellow-500">Post Approvals</span>
          </Link>
        </div>
      </div>
    </>
  );
}
