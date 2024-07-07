import Link from "next/link";
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
  const postContent = await api.get.staffPermission.query({ userId: id });
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
            include {postContent?.specialist && "specialist "}{" "}
            {postContent?.representative && "representative "}{" "}
            {postContent?.admin && "admin "}{" "}
            {postContent?.highcouncil && "high council "}{" "}
            {postContent?.guildmaster && "guildmaster"}.
          </p>
          {postContent?.admin && (
            <div className="bg-slate-900">
              <Link href={`/dashboard/${id}/staff/leaderboard`}>
                <button className="button-40">Leaderboard</button>
              </Link>
            </div>
          )}
          <div>
            <Link href={`/editor/${id}`}>
              <button className="button-40">Create Post</button>
            </Link>
          </div>
          <div>
            <Link href={`/editor/${id}/approve`}>
              <button className="button-40">Approve Post</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
