//MEMBER ONLY page for each game-guild
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
export default async function page({ params }: { params: { game: string } }) {
  const session = await getServerAuthSession();
  if (!session?.user.id) return <p>You must log in to view this page.</p>;
  const id = session?.user.id;
  const game = params.game;
  let permission;
  if (game === "eso") {
    permission = await api.get.esoPermission.query({ userId: id });
  }
  if (game === "ffxiv") {
    permission = await api.get.ffxivPermission.query({ userId: id });
  }
  if (game === "swtor") {
    permission = await api.get.swtorPermission.query({ userId: id });
  }
  if (!permission || permission.rank === "none")
    return <p>You do not seem to belong to this guild.</p>;

  return (
    <>
      <div>
        <p className="text-white">Hello {session.user.name}!</p>
        <p className="text-3xl text-white">
          Current published guild announcements for {game} will be here
        </p>
      </div>
    </>
  );
}

/* 
Editor should be visible to staff.
*/
