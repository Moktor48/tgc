//Page to narrow down specific game, id of person, then officer page
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page({ params }: { params: { game: string } }) {
  const session = await getServerAuthSession();
  if (!session?.user.id) return <p>You must log in to view this page.</p>;
  const id = session?.user.id;
  const game = params.game;
  const ePerm = await api.get.esoPermission.query({ userId: id });
  const fPerm = await api.get.ffxivPermission.query({ userId: id });
  const sPerm = await api.get.swtorPermission.query({ userId: id });
  if (!ePerm ?? !fPerm ?? !sPerm)
    return <p>You do not seem to belong to this guild.</p>;
  const perm = await api.get.staffPermission.query({ userId: id });
  const test = await api.get.esoPermission.query({ userId: id });

  return <div>Future officer poage for {game}</div>;
}
