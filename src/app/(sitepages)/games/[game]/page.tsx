//Basic Game Landing Page, PRIVATE
import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
export default async function page({ params }: { params: { game: string } }) {
  const game = params.game;
  const session = await getServerAuthSession();
  const id = session?.user.id;
  return (
    <>
      <div>
        {!session && <p>You must log in to see guild content.</p>}
        {session && (
          <Link href={`/games/${game}/${id}`} className="text-white">
            Member Page!
          </Link>
        )}
      </div>
    </>
  );
}
