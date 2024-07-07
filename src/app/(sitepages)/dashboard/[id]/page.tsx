//Personal account page for all members, should display notifications based on permissions and links to pages such as admin or staff when relevant

import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function AccountPage() {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const postContent = await api.get.staffPermission.query({
    userId: session.user.id,
  });
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2">
          <p className="text-center text-5xl text-white">
            Private Account Page for {session?.user.name}
          </p>
          {session.user.role === "staff" && (
            <Link href={`/dashboard/${session.user.id}/staff`}>
              <button className="button-40">Staff Page</button>
            </Link>
          )}
          {postContent?.admin && (
            <Link href={`/dashboard/${session.user.id}/staff/admin`}>
              <button className="button-40">Admin Page</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

/*
FUTURE NOTES
This is where things get complicated
*/
