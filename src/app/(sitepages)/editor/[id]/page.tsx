//This is the lead page for editor submissions.
import React from "react";
import NavBarDB from "~/app/_components/(gameComponents)/(dashboard)/NavBarDB";
import PostForm from "~/app/_components/(postSubmission)/PostForm";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) return null;
  const id = params.id;
  const perm = await api.get.staffPermission.query({ userId: id });
  return (
    <>
      <NavBarDB id={id} perm={perm} />
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2">
          <PostForm userId={id} />
        </div>
      </div>
    </>
  );
}
