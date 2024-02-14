import Link from "next/link";
import React from "react";
import NavBar from "~/app/_components/(core)/NavBar";
import { getServerAuthSession } from "~/server/auth";

export default async function GamePage() {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const role = session.user.role;
  const id = session.user.id;
  return (
    <div>
      <NavBar role={role} id={id} />
      <p className="text-white">Game listing</p>
      <Link className="text-white" href="/games/eso">
        Go to ESO
      </Link>
      <br />
      <Link className="text-white" href="/games/ffxiv">
        Go to FFXIV
      </Link>
      <br />
      <Link className="text-white" href="/games/swtor">
        Go to SWTOR
      </Link>
      <br />
      <p>Apply to guild for games</p>
    </div>
  );
}
