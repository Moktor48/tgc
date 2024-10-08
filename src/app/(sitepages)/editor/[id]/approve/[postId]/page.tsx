import React from "react";
import { api } from "~/trpc/server";

import EditApproveStateWrap from "~/app/_components/(tinymce)/EditApproveStateWrap";

export default async function page({
  params,
}: {
  params: { id: string; postId: string };
}) {
  const postId = params.postId;
  const display = await api.get.getPost.query({ postId: postId });
  if (!display) return <p>No Data!</p>;
  return (
    <div>
      <EditApproveStateWrap data={display} params={params} />
    </div>
  );
}
