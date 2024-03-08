//SPECIFIC FILTER: editor/[id]/display/[permission]/[guild]/[audience]/[pubs] = notification, article, build, guide, report
import Link from "next/link";
import React from "react";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";

export default async function page({
  params,
}: {
  params: {
    game: string;
    id: string;
    type: string;
    permission: string;
    audience: string;
  };
}) {
  const session = await getServerAuthSession();
  const id = params.id;
  const game = params.game;
  const type = params.type;
  const permission =
    params.permission === "public"
      ? true
      : params.permission === "private"
        ? false
        : null;
  const audience = params.audience;
  if (!permission) {
    if (!session) return <h1>You need to log in</h1>;
  }

  if (
    game != "eso" &&
    game != "swtor" &&
    game != "ffxiv" &&
    game != "general"
  ) {
    return <h1>Invalid game</h1>;
  }

  if (
    type != "notification" &&
    type != "article" &&
    type != "build" &&
    type != "guide" &&
    type != "report"
  ) {
    return <h1>Invalid type</h1>;
  }
  if (permission != true && permission != false) {
    return <h1>Invalid permission</h1>;
  }
  if (
    audience != "general" &&
    audience != "staff" &&
    audience != "raid" &&
    audience != "officer"
  ) {
    return <h1>Invalid audience</h1>;
  }

  const buildQuery = {
    general: false,
    eso: false,
    swtor: false,
    ffxiv: false,
    type: type,
    public: permission,
    staff: false,
    raid: false,
    officer: false,
  };
  audience === "staff"
    ? (buildQuery.staff = true)
    : audience === "raid"
      ? (buildQuery.raid = true)
      : audience === "general"
        ? (buildQuery.general = true)
        : (buildQuery.officer = true);
  game === "eso"
    ? (buildQuery.eso = true)
    : game === "swtor"
      ? (buildQuery.swtor = true)
      : (buildQuery.ffxiv = true);

  const post = await api.get.motherOfAllPosts.query(buildQuery);
  console.log(post);
  return (
    <div>
      <h1>
        This is where you will find links to every {type} for {game}/
        {post.map((post) => (
          <p key={post.id}>
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
