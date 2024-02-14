//Personal account page for all members, should display notifications based on permissions and links to pages such as admin or staff when relevant

import React from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function AccountPage() {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;

  return (
    <>
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
