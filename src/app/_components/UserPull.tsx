import React from 'react'
import { api } from '~/trpc/server'
import { getServerAuthSession } from '~/server/auth'

export default async function UserPull() {
    const parsedUsers = []
    const session = await getServerAuthSession()
    if (!session) return null
    const users = await api.post.allUsers.query()
    if (!users) return null

    async function parseUser(){
        for (const i of users) {
          const user = i
          const userId = user.id
          const parseStaff = await api.post.staffPermission.query({userId: userId})
          const parseESO = await api.post.esoPermission.query({userId: userId})
          const parseSWTOR = await api.post.swtorPermission.query({userId: userId})
          const parseFFXIV = await api.post.ffxivPermission.query({userId: userId})
          const bundle = []
          bundle.push(user)
          bundle.push(parseStaff)
          bundle.push(parseESO)
          bundle.push(parseSWTOR)
          bundle.push(parseFFXIV)
          parsedUsers.push(bundle)
          console.log(parsedUsers)
    } return parsedUsers


}
  return (
    <div>
        <h1>User Pull</h1>
    </div>
  )
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