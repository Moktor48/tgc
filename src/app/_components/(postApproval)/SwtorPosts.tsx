import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import React from "react";
import Link from "next/link";

export default async function SwtorPosts() {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const id = session.user.id;
  const swtorPerms = await api.get.swtorPermission.query({ userId: id });
  if (!swtorPerms)
    return (
      <div className="text-3xl text-yellow-500">
        LOCKED: No access to SWTOR-specific posts!
      </div>
    );
  if (
    !swtorPerms.raidlead &&
    !swtorPerms.mentor &&
    swtorPerms.rank != "officer"
  )
    return null;
  const unpubPost = await api.get.unpublishedPostsSwtor.query();
  return (
    <div className="text-center">
      <h1 className="text-white">Unpublished Posts for SWTOR</h1>
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
