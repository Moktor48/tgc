import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";

export default async function page({
  params,
}: {
  params: { game: string; id: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const id = params.id;

  return (
    <>
      <div>
        <p className="text-white">Hello {session.user.name}!</p>
        <p className="text-3xl text-white">Current published posts</p>
        {session.user.role === "staff" && (
          <Link href={`/editor?${id}`} className="text-white">
            Click to run editor
          </Link>
        )}
      </div>
    </>
  );
}

/* 
Editor should be visible to staff.
*/
