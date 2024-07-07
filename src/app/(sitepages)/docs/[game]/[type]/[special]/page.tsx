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
// Under Construction for special permissions: new query needed
export default async function page({
  params,
}: {
  params: { game: string; type: string; special: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return <p>No Data!</p>;
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
        <div>
          <p>Title: {post.title}</p>
          <p>Author: {post.createdBy.name}</p>
        </div>
      ))}
    </div>
  );
}
