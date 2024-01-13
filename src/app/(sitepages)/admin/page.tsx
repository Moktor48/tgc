import React from 'react'
import UserSearch from '~/app/_components/UserSearch'
import { getServerAuthSession } from '~/server/auth'

export default async function page() {
    
    const session = await getServerAuthSession()
    
    if (!session) {
        return <div>You must be logged in to view this page.</div>
    } else if (session?.user.role !== 'admin') {
        return (
        //Log attempted access in DB
        <div>You don't belong here!</div>
        )
    }  else {
  return (
    <div>
        <UserSearch />
    </div>
  )
}
}