//Filters down the posts /games/eso/id/...
// Build, article, guide, etc will filter here
import Link from "next/link";
import React from "react";
import { api } from "~/trpc/server";

export default async function page({
  params,
}: {
  params: { game: string; id: string; pubs: string };
}) {
  //Logic to pull specified type of post for the game, based on params then we will fill out boxes/grid with some photos? Clicking brings you to actual post
  const id = params.id;
  const game = params.game;
  const type = params.pubs;
  const selGame = { eso: false, swtor: false, ffxiv: false, type: type };

  game === "eso"
    ? (selGame.eso = true)
    : game === "swtor"
      ? (selGame.swtor = true)
      : game === "ffxiv"
        ? (selGame.ffxiv = true)
        : null;
  const post = await api.get.publishedPostsMod.query(selGame);
  console.log(post);
  return (
    <div>
      <h1>
        This is where you will find links to every {type} for {game}/
        {post.map((post) => (
          <p>
            <Link href={`/editor/${id}/display?postId=${post.id}`}>
              {post.title}
            </Link>{" "}
            by{" "}
            <Link
              href={`/dashboard/${id}/staff/${post.createdBy.id}/userManager`}
            >
              {post.createdBy.name}
            </Link>
          </p>
        ))}
      </h1>
    </div>
  );
}
