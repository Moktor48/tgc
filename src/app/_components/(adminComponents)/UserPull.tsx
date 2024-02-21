import React from "react";
import { api } from "~/trpc/server";
import Link from "next/link";
import { getServerAuthSession } from "~/server/auth";

export default async function UserPull() {
  const guest = await api.get.allGuests.query();
  const session = await getServerAuthSession();
  if (!session) return <div>You must be logged in to view this page.</div>;
  const id = session.user.id;
  return (
    <div className="flex flex-col justify-items-center">
      <h1>Guests found in the database for approvals</h1>
      {guest.map(
        (user: {
          id: string;
          name: string;
          email: string;
          role: string;
          image: string;
        }) => {
          return (
            <Link
              href={`/dashboard/${id}/userManager/${user.id}?name=${user.name}&email=${user.email}&role=${user.role}&image=${user.image}`}
            >
              <p>Username: {user.name}</p>
              <br />
            </Link>
          );
        },
      )}
    </div>
  );
}
