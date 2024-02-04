import Link from "next/link";
import React from "react";
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

  let gamePubPosts;
  if (game === "eso") {
    gamePubPosts = await api.get.publishedPostsEso.query();
  }
  if (game === "ffxiv") {
    gamePubPosts = await api.get.publishedPostsFfxiv.query();
  }
  if (game === "swtor") {
    gamePubPosts = await api.get.publishedPostsSwtor.query();
  }

  return (
    <div>
      <p className="text-white">Hello {session.user.name}!</p>
      <p className="text-3xl text-white">Current published posts</p>
      {session.user.role === "staff" && (
        <Link href={`/editor?${id}`} className="text-white">
          Click to run editor
        </Link>
      )}
    </div>
  );
}

/* 
Editor should be visible to staff.
*/
