//This is the lead page for editor submissions.
import React from "react";
import PostForm from "~/app/_components/(postSubmission)/PostForm";
import { getServerAuthSession } from "~/server/auth";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) return null;
  const id = params.id;
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2">
          <PostForm userId={id} />
        </div>
      </div>
    </>
  );
}
