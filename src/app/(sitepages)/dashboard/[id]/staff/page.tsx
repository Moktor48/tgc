import React from "react";
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

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2 text-white">
          <p>
            Clearly you are a staff member, {session?.user.name}, permissions
            include {perm?.specialist && "specialist "}{" "}
            {perm?.representative && "representative "}{" "}
            {perm?.admin && "admin "} {perm?.highcouncil && "high council "}{" "}
            {perm?.guildmaster && "guildmaster"}.
          </p>
        </div>
      </div>
    </>
  );
}
