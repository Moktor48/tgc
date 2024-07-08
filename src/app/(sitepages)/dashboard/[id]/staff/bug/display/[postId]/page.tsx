import React from "react";
import { api } from "~/trpc/server";

import TinyMCEDisplayBug from "~/app/_components/(tinymce)/TinyMCEDisplayBug";
type BugType = {
  id: string;
  title: string;
  content: string;
  createdBy: {
    name: string;
    id: string;
  };
} | null;
export default async function page({
  params,
}: {
  params: { id: string; postId: string };
}) {
  const postId = params.postId;
  const display = (await api.get.getBug.query({ postId: postId })) as BugType;
  if (!display) return <p>No Data!</p>;
  return (
    <div>
      <TinyMCEDisplayBug data={display} />
    </div>
  );
}
