import React from "react";
import { api } from "~/trpc/server";
import Link from "next/link";

export default async function UserPull() {
  const guest = await api.post.allGuests.query();

  return (
    <div>
      {guest.map((user: { id: string; name: string; email: string }) => {
        return (
          <Link
            href={`/userManage?id=${user.id}&name=${user.name}&email=${user.email}`}
          >
            <p>Username: {user.name}</p>
            <p>Email: {user.email}</p>
          </Link>
        );
      })}
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
