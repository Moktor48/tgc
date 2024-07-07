import React from "react";
import DisplayPostFinal from "~/app/_components/(tinymce)/DisplayPostFinal";

export default function page({ params }: { params: { game: string } }) {
  return (
    <div>
      <DisplayPostFinal data={} params={params} />
    </div>
  );
}
