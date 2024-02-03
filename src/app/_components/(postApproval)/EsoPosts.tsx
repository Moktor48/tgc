import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import React from "react";
import Link from "next/link";

export default async function EsoPosts() {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const id = session.user.id;
  const esoPerms = await api.post.esoPermission.query({ userId: id });
  if (!esoPerms)
    return (
      <div className="text-3xl text-yellow-500">
        LOCKED: No access to ESO-specific posts!
      </div>
    );
  if (!esoPerms.raidlead && !esoPerms.mentor && esoPerms.rank != "officer")
    return null;
  const unpubPost = await api.post.unpublishedPostsEso.query();
  return (
    <div className="text-center">
      <h1 className="text-white">UnPublished Posts for ESO</h1>
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
