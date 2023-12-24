import React from 'react'
import { getServerAuthSession } from '~/server/auth'


export default async function Page( { params }: {params: { id: string } }) {
  const session = await getServerAuthSession()

  
  return (
    <div>Private Admin Page, you must be an admin, {session?.user.name}</div>
  )
}
