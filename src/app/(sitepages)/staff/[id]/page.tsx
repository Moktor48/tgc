import React from 'react'
import { getServerAuthSession } from '~/server/auth'


export default async function Page( { params }: {params: { id: string } }) {
  const session = await getServerAuthSession()


  return (
    <div>
      <p>Clearly you are an officer, {session?.user.name}</p>
      <p>Custom Page for officers</p>
      <p>Guild breakdown for this officer</p>
      <p>Ability to adjust ranks for players in same guild</p>
      <p>Ability to create and modify events for guild</p>
      <p>Ability to make guild page announcements</p>
    </div>
  )
}
