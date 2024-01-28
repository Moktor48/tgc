import Link from 'next/link'
import React from 'react'
import { getServerAuthSession } from '~/server/auth'
import { api } from '~/trpc/server'

export default async function AccountPage( { params }: {params: { id: string } }) {
  const session = await getServerAuthSession()
  const id = params.id
  const role = session?.user.role
  if (!session) return <div>You must be logged in to view this page.</div>
  const permission = await api.post.staffPermission.query({userId: session?.user.id})
  return (
    <div>
      <p>Private Account Page for {session?.user.name}</p>
      {permission?.admin && <Link href={`/account/${id}/admin`}>Admin Page</Link>}
      {role === "staff" && <Link href={`/account/${id}/staff`}>Staff Page</Link>}
    </div>

  )
}

/*
FUTURE NOTES
This is where things get complicated
*/