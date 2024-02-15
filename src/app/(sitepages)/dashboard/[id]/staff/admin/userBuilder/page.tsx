import React from "react";
import UserBuilder from "~/app/_components/(adminComponents)/UserBuilder";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const id = params.id;
  const perm = await api.get.staffPermission.query({
    userId: id,
  });
  if (!perm?.admin) return <p>You aren't allowed to be here!</p>;

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="newsletter flex w-1/2 justify-center">
          <UserBuilder />
        </div>
      </div>
    </>
  );
}
