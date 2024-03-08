import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import React from "react";
import Link from "next/link";

export default async function FfxivPosts() {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  if (session.user.role != "staff")
    return <div>You are not authorized to be here.</div>;
  const id = session.user.id;
  const ffxivPerms = await api.get.ffxivPermission.query({ userId: id });
  if (!ffxivPerms)
    return (
      <div className="text-3xl text-red-500">
        LOCKED: No access to FFXIV-specific posts!
      </div>
    );
  if (
    !ffxivPerms.raidlead &&
    !ffxivPerms.mentor &&
    ffxivPerms.rank != "officer"
  )
    return null;
  const unpubPost = await api.get.unpublishedPostsFfxiv.query();
  if (unpubPost == null || unpubPost.length == 0)
    return (
      <div className="text-3xl text-green-500">
        No unpublished posts for FFXIV
      </div>
    );
  return (
    <div className="text-center">
      <h1 className="text-white">Unpublished Posts for FFXIV</h1>
      {unpubPost.map(
        (post: { id: string; title: string; createdBy: { name: string } }) => {
          return (
            <div>
              <Link
                className="link"
                href={`./approve/${post.id}?title=${post.title}`}
              >
                <p key={post.id}>
                  Title: {post.title} Created by: {post.createdBy.name}
                </p>
              </Link>
            </div>
          );
        },
      )}
    </div>
  );
}
