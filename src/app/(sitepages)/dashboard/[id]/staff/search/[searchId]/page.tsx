import React from "react";
import UserModify from "~/app/_components/(adminComponents)/UserModify";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function UserManage({
  params,
}: {
  params: { id: string; searchId: string };
}) {
  const userId = params.id;
  const searchId = params.searchId;
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const postContent = await api.get.staffPermission.query({
    userId: userId,
  });

  if (!postContent?.admin) return <p>You aren't allowed to be here!</p>;
  const user = await api.get.userProfile.query({ userId: searchId });
  const userStaff = await api.get.staffPermission.query({ userId: searchId });
  return (
    <div>
      <UserModify user={user} searchUserId={searchId} userStaff={userStaff} />
    </div>
  );
}

/**
 * { user: ({
 * eso: {
 * id: string;
 * userId: string;
 * rank: string;
 * raid: boolean | null;
 * raidlead: boolean | null;
 * mentor: boolean | null; }[];
 * ffxiv: {
 * id: string;
 * userId: string;
 * rank: string; r
 * aid: boolean | null;
 * raidlead: boolean | null;
 * mentor: boolean | null; }[];
 * swtor: {
 * id: string;
 * userId: string;
 * rank: string; r
 * aid: boolean | null;
 * raidlead: boolean | null;
 * mentor: boolean | null; }[];
 
  id: string; userId: string; rank: string; raid: boolean | null; raidlead: boolean | null; mentor: boolean | null; } | null
  id: string; userId: string; rank: string; raid: boolean | null; raidLead: boolean | null; mentor: boolean | null; } | null


 */
