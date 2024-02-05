import Link from "next/link";
import React from "react";
import NavBarEso from "~/app/_components/(gameComponents)/(eso)/NavBarEso";
import NavBarFfxiv from "~/app/_components/(gameComponents)/(ffxiv)/NavBarFfxiv";
import NavBarSwtor from "~/app/_components/(gameComponents)/(swtor)/NavBarSwtor";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page({
  params,
}: {
  params: { game: string; id: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return null;
  const id = params.id;
  const game = params.game;
  const perm = await api.get.staffPermission.query({ userId: id });

  return (
    <>
      {game === "eso" && <NavBarEso session={session} id={id} perm={perm} />}
      {game === "ffxiv" && (
        <NavBarFfxiv session={session} id={id} perm={perm} />
      )}
      {game === "swtor" && (
        <NavBarSwtor session={session} id={id} perm={perm} />
      )}
      <div>
        <p className="text-white">Hello {session.user.name}!</p>
        <p className="text-3xl text-white">Current published posts</p>
        {session.user.role === "staff" && (
          <Link href={`/editor?${id}`} className="text-white">
            Click to run editor
          </Link>
        )}
      </div>
    </>
  );
}

/* 
Editor should be visible to staff.
*/
