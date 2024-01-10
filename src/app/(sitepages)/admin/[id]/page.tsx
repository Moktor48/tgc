import React from 'react'
import UserSearch from '~/app/_components/UserSearch'
import { getServerAuthSession } from '~/server/auth'


export default async function AdminPage( { params }: {params: { id: string } }) {
  const session = await getServerAuthSession()

  
  return (
    <div>
      <p>Private Admin Page, you must be an admin, {session?.user.name}</p>
      <p>How much control should admin have?</p>
      <UserSearch />
    </div>
  )
}
/*
Needed features:
Search database for users. There will be MANY. On-load may not be feasible. 
Status change for users, roles for permissions, deletions, flags, etc. Some of these will have overlap with officers, but the admin may have a wider reach.
Alert posting 
Post approvals, if needed. 

*/