//This is the lead page for editor submissions.
import React from "react";
import TinyMCE from "~/app/_components/(tinymce)/TinyMCE";
import { getServerAuthSession } from "~/server/auth";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) return null;
  const id = params.id;
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2">
          <TinyMCE id={id} />
        </div>
      </div>
    </>
  );
}
