import React from "react";
import TinyMCEBUG from "~/app/_components/(tinymce)/TinyMCEBug";

export default function page({ params }: { params: { id: string } }) {
  const id = params.id;
  return (
    <div>
      <TinyMCEBUG id={id} />
    </div>
  );
}
