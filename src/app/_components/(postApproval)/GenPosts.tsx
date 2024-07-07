import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import React from "react";
import Link from "next/link";

export default async function GenPosts() {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  if (session.user.role != "staff")
    return <div>You are not authorized to be here.</div>;
  const unpubPost = await api.get.unpublishedPosts.query();
  if (unpubPost == null || unpubPost.length == 0)
    return (
      <div className="text-3xl text-green-500">
        No unpublished posts for the general guild
      </div>
    );
  return (
    <div className="text-center">
      <h1 className="text-white">Unpublished Posts for the General Guild</h1>
      {unpubPost.map(
        (post: {
          id: string;
          title: string;
          createdBy: {
            name: string;
            id: string;
          };
          permissions: {
            tgc_guild: boolean;
          } | null;
        }) => {
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
