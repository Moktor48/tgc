import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
export default async function page({ params }: { params: { game: string } }) {
  const session = await getServerAuthSession();
  if (!session?.user.id) return <p>You must log in to view this page.</p>;
  const id = session?.user.id;
  const game = params.game;
  let permission;
  if (game === "eso") {
    permission = await api.get.esoPermission.query({ userId: id });
  }
  if (game === "ffxiv") {
    permission = await api.get.ffxivPermission.query({ userId: id });
  }
  if (game === "swtor") {
    permission = await api.get.swtorPermission.query({ userId: id });
  }
  console.log(permission);
  if (!permission || permission.rank === "none")
    return <p>You do not seem to belong to this guild.</p>;

  return (
    <>
      <div>
        <Link href={`/games/${game}/${id}`} className="text-white">
          Member Page!
        </Link>
      </div>
    </>
  );
}

/*
import Link from "next/link";
import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
export default async function page({ params }: { params: { game: string } }) {
  const game = params.game;
  const session = await getServerAuthSession();
  if (!session?.user.id) return <p>You must log in to view this page.</p>;
  const id = session?.user.id;

  const permission = await api.get[`${game}Permission`].query({ userId: id });

  console.log(permission);
  if (!permission || permission.rank === "none")
    return <p>You do not seem to belong to this guild.</p>;

  return (
    <div>
      <p>
        So, if I did this right, you should have a rank of {permission.rank} and
        {permission.raid && "raid"}.
      </p>
      <Link href={`/games/${game}/${id}`} className="text-white">
        Member Page!
      </Link>
    </div>
  );
}
*/
