import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import type { PubPost, Guild } from "~/type";

export default async function page({ params }: { params: { game: string } }) {
  const session = await getServerAuthSession();
  if (!session) {
    if (!params) return <p>No Data!</p>;
    const guild: Guild = {
      eso: false,
      swtor: false,
      ffxiv: false,
      tgc_guild: false,
      type: "article",
    };
    const select = params.game;
    if (
      select != "eso" &&
      select != "swtor" &&
      select != "ffxiv" &&
      select != "tgc_guild"
    )
      return <p>No Data!</p>;
    guild[select] = true;

    const data = (await api.get.publishedPostsModPub.query(guild)) as PubPost[];
    return (
      <div>
        {data.map((post) => (
          <div>
            <p>Title: {post.title}</p>
            <p>Author: {post.createdBy.name}</p>
          </div>
        ))}
      </div>
    );
  }
  if (!params) return <p>No Data!</p>;
  const guild: Guild = {
    eso: false,
    swtor: false,
    ffxiv: false,
    tgc_guild: false,
    type: "article",
  };
  const select = params.game;
  if (
    select != "eso" &&
    select != "swtor" &&
    select != "ffxiv" &&
    select != "tgc_guild"
  )
    return <p>No Data!</p>;
  guild[select] = true;

  const data = (await api.get.publishedPostsMod.query(guild)) as PubPost[];
  return (
    <div>
      <h1>Published Posts for {params.game}</h1>
      {data.map((post) => (
        <Link href={`/editor/display/${post.id}`}>
          <div className="card card-bordered w-96 border-red-900 bg-base-100 shadow-xl">
            <p className="p-1">Title: {post.title}</p>
            <p className="p-1">Author: {post.createdBy.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
