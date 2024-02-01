//Page for staff members, will include portals to staff related pages.
import Link from 'next/link'
import React from 'react'
import { getServerAuthSession } from '~/server/auth'
import { api } from '~/trpc/server'

export default async function StaffPage( { params }: {params: { id: string } }) {
  const session = await getServerAuthSession()
  if (!session) return <div>You must be logged in to view this page.</div>
  const id = params.id
  const permissions = await api.post.staffPermission.query({userId: id})
  if (session.user.role != "staff") return <p className="text-white text-3xl">You are not authorized to view this page</p>

  return (
    <div>
      <p>Clearly you are a staff member, {session?.user.name}, permissions include {permissions?.specialist && "specialist "} {permissions?.representative && "representative "} {permissions?.admin && "admin "} {permissions?.highcouncil && "high council "} {permissions?.guildmaster && "guildmaster"}.</p>
      <p>Custom Page for officers</p>
      <p>Guild breakdown for this officer</p>
      <p>Ability to adjust ranks for players in same guild</p>
      <p>Ability to create and modify events for guild</p>
      <p>Ability to make guild page announcements</p>

      <Link href={`../../../editor/approve`}><span className="text-3xl text-yellow-500">Post Approvals</span></Link>

    </div>
  )
}
