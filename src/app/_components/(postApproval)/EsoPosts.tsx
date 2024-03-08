import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import React from "react";
import Link from "next/link";

export default async function EsoPosts() {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  if (session.user.role != "staff")
    return <div>You are not authorized to be here.</div>;
  const id = session.user.id;
  const esoPerms = await api.get.esoPermission.query({ userId: id });
  if (!esoPerms)
    return (
      <div className="text-3xl text-red-500">
        LOCKED: No access to ESO-specific posts!
      </div>
    );
  if (!esoPerms.raidlead && !esoPerms.mentor && esoPerms.rank != "officer")
    return null;
  const unpubPost = await api.get.unpublishedPostsEso.query();
  if (unpubPost == null || unpubPost.length == 0)
    return (
      <div className="text-3xl text-green-500">
        No unpublished posts for ESO
      </div>
    );
  return (
    <div className="text-center">
      <h1 className="text-white">Unpublished Posts for ESO</h1>
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
