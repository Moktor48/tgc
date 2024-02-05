//Personal account page for all members, should display notifications based on permissions and links to pages such as admin or staff when relevant

import React from "react";
import NavBarDB from "~/app/_components/(gameComponents)/(dashboard)/NavBarDB";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function AccountPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerAuthSession();
  const id = params.id;
  if (!session) return <div>You must be logged in to view this page.</div>;
  const perm = await api.get.staffPermission.query({
    userId: session?.user.id,
  });

  return (
    <>
      <NavBarDB id={id} perm={perm} />
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2">
          <p className="text-center text-5xl text-white">
            Private Account Page for {session?.user.name}
          </p>
        </div>
      </div>
    </>
  );
}

/*
FUTURE NOTES
This is where things get complicated
*/
