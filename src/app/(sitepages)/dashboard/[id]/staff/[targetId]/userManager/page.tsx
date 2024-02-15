import React from "react";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page({
  params,
}: {
  params: { id: string; targetId: string };
}) {
  const userId = params.id;
  const targetId = params.targetId;
  const session = await getServerAuthSession();
  if (!session) return <p>You must be logged in to view this page.</p>;
  if (session.user.id != userId)
    return <p>You are not authorized to view this page.</p>;
  if (session.user.role != "staff")
    return <p>You are not authorized to view this page.</p>;
  const target = await api.get.fullProfile.query({ userId: targetId });
  return (
    <div>
      <h1>
        You are {session.user.name} and are viewing the page of {target?.name}
      </h1>
    </div>
  );
}
