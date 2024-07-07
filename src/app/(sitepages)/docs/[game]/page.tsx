import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
type Guild = {
  eso: boolean;
  swtor: boolean;
  ffxiv: boolean;
  general: boolean;
};

export default async function page({ params }: { params: { game: string } }) {
  const session = await getServerAuthSession();
  if (!session) {
    if (!params) return <p>No Data!</p>;
    const guild: Guild = {
      eso: false,
      swtor: false,
      ffxiv: false,
      general: false,
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

  const data = await api.get.publishedPostsMod.query(guild);
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
