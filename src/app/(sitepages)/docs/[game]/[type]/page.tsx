import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
type Guild = {
  eso: boolean;
  swtor: boolean;
  ffxiv: boolean;
  general: boolean;
  type: string;
};

export default async function page({
  params,
}: {
  params: { game: string; type: string };
}) {
  const session = await getServerAuthSession();
  if (!session) {
    if (!params) return <p>No Data!</p>;
    const guild: Guild = {
      eso: false,
      swtor: false,
      ffxiv: false,
      general: false,
      type: "article",
    };
    const select = params.game;
    if (
      select != "eso" &&
      select != "swtor" &&
      select != "ffxiv" &&
      select != "general"
    )
      return <p>No Data!</p>;
    guild[select] = true;

    const data = await api.get.publishedPostsModPub.query(guild);
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
    general: false,
    type: "article",
  };
  const select = params.game;
  if (
    select != "eso" &&
    select != "swtor" &&
    select != "ffxiv" &&
    select != "general"
  )
    return <p>No Data!</p>;
  guild[select] = true;
  guild.type = params.type;
  const data = await api.get.publishedPostsMod.query(guild);
  return (
    <div>
      <h1>
        Published Posts for {params.game} - {params.type}
      </h1>
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
