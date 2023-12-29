import React from 'react'
import { getServerAuthSession } from '~/server/auth'

export default async function AccountPage( { params }: {params: { id: string } }) {
  const session = await getServerAuthSession()

  return (
    <div>Private Account Page for {session?.user.name}</div>
  )
}
