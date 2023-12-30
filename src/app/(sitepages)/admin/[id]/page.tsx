import React from 'react'
import { getServerAuthSession } from '~/server/auth'


export default async function AdminPage( { params }: {params: { id: string } }) {
  const session = await getServerAuthSession()

  
  return (
    <div>
      <p>Private Admin Page, you must be an admin, {session?.user.name}</p>
      <p>How much control should admin have?</p>
    </div>
  )
}
