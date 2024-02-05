//page for approvals to be viewed by name and individual posts selected
import React from "react";
import NavBarDB from "~/app/_components/(gameComponents)/(dashboard)/NavBarDB";
import EsoPosts from "~/app/_components/(postApproval)/EsoPosts";
import FfxivPosts from "~/app/_components/(postApproval)/FfxivPosts";
import GenPosts from "~/app/_components/(postApproval)/GenPosts";
import SwtorPosts from "~/app/_components/(postApproval)/SwtorPosts";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) return <p>You must be logged in to view this page.</p>;
  if (session.user.role != "staff")
    return (
      <p className="text-3xl text-white">
        You are not authorized to view this page
      </p>
    );
  const id = params.id;
  const perm = await api.get.staffPermission.query({ userId: id });
  return (
    <>
      <NavBarDB id={id} perm={perm} />
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2">
          <h1 className="text-center text-5xl text-white">Post Approvals</h1>
          <br />
          <GenPosts />
          <br />
          <EsoPosts />
          <br />
          <FfxivPosts />
          <br />
          <SwtorPosts />
          <br />
        </div>
      </div>
    </>
  );
}
