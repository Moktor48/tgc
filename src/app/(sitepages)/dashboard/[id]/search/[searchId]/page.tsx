import React from "react";
import UserModify from "~/app/_components/(adminComponents)/UserModify";
import NavBarDB from "~/app/_components/(gameComponents)/(dashboard)/NavBarDB";
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
  const perm = await api.get.staffPermission.query({
    userId: userId,
  });
  const permE = await api.get.esoPermission.query({
    userId: userId,
  });
  const permF = await api.get.ffxivPermission.query({
    userId: userId,
  });
  const permS = await api.get.swtorPermission.query({
    userId: userId,
  });
  const officer = { eso: permE?.rank, ffxiv: permF?.rank, swtor: permS?.rank };
  if (!perm?.admin) return <p>You aren't allowed to be here!</p>;
  const user = await api.get.userProfile.query({ userId: searchId });
  const userEso = await api.get.esoPermission.query({ userId: searchId });
  const userFfxiv = await api.get.ffxivPermission.query({ userId: searchId });
  const userSwtor = await api.get.swtorPermission.query({ userId: searchId });
  const userStaff = await api.get.staffPermission.query({ userId: searchId });
  return (
    <div>
      <NavBarDB id={userId} perm={perm} />
      <UserModify
        user={user}
        userEso={userEso}
        userFfxiv={userFfxiv}
        userSwtor={userSwtor}
        userStaff={userStaff}
        perm={perm}
        officer={officer}
      />
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
