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

/*
Users: [{U}{U}{U}]
User: {U{E}{S}{F}{S}}
parsedUsers: []
bundle: []
user: {}
eso: {}
swtor: {}
ffxiv: {}
staff: {}
bundle: [{}{}{}{}{}]:
[user: {
    id: string;
    name: string;
    email: string;
    emailVerified: Date | null;
    image: string;
    role: string;
}
{
    id: string;
    userId: string;
    admin: boolean | null;
    specialist: boolean | null;
    representative: boolean | null;
    highcouncil: boolean | null;
    guildmaster: boolean | null;
} | null
...]

parsedUsers: [[][][][][]]



{
    eso: {
        id: string;
        userId: string;
        rank: string;
        raid: boolean | null;
        raidlead: boolean | null;
        mentor: boolean | null;
    }[];
    ffxiv: {
        id: string;
        userId: string;
        rank: string;
        raid: boolean | null;
        raidlead: boolean | null;
        mentor: boolean | null;
    }[];
    swtor: {
      id: string;
        userId: string;
        rank: string;
        raid: boolean | null;
        raidlead: boolean | null;
        mentor: boolean | null;
    }[];
    staff: {
      id: string;
        userId: string;
        admin: boolean | null;
        specialist: boolean | null;
        representative: boolean | null;
        highcouncil: boolean | null;
        guildmaster: boolean | null;
    }[];
    id: string;
    userId: string;
    admin: boolean | null;
    specialist: boolean | null;
    representative: boolean | null;
*/
