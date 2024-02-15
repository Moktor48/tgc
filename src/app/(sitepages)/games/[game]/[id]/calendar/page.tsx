import React from "react";
import { getServerAuthSession } from "~/server/auth";
export default async function page({ params }: { params: { game: string } }) {
  const session = await getServerAuthSession();
  if (!session?.user.id) return <p>You must log in to view this page.</p>;
  const game = params.game;
  return <div>Future Calendar for {game}</div>;
}
