import React from "react";
import TinyMCEDisplay from "~/app/_components/(tinymce)/TinyMCEDisplay";

export default function page({
  params,
}: {
  params: { id: string; postId: string };
}) {
  return (
    <div>
      <TinyMCEDisplay id={params.id} postId={params.postId} />
    </div>
  );
}
