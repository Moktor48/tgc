import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import DisplayPost from "~/app/_components/(postDisplay)/DisplayPost";
import React from "react";

export default async function PostDisplay({
  searchParams,
}: {
  searchParams: { postId: string };
}) {
  const postId = searchParams.postId;
  const session = await getServerAuthSession();
  if (!session) return <p>You must be logged in to view this page.</p>;
  if (!postId) return <p>No post ID provided.</p>;
  const postContent = await api.post.getPost.query({ postId });
  if (!postContent) return <p>No post found.</p>;

  return (
    <div className="bg-black">
      <h1 className="text-white">{postContent.title}</h1>
      <DisplayPost postContent={postContent} />
    </div>
  );
}
