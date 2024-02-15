import React from "react";
import DisplayPost from "~/app/_components/(postDisplay)/DisplayPost";
import { api } from "~/trpc/server";
export default async function PostDisplay({
  searchParams,
}: {
  searchParams: { postId: string };
}) {
  const postId = searchParams.postId;
  const postContent = await api.get.getPost.query({ postId });
  if (!postContent) return <p>No post found.</p>;
  return (
    <div className="bg-black">
      <h1 className="text-white">{postContent.title}</h1>
      <DisplayPost postContent={postContent} />
    </div>
  );
}
