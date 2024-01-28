import React from 'react'
import UserPull from '~/app/_components/UserPull'
import UserSearch from '~/app/_components/UserSearch'
import { getServerAuthSession } from '~/server/auth'
import { api } from '~/trpc/server'

export default async function page() {
    
    const session = await getServerAuthSession()
    if (!session) return <div>You must be logged in to view this page.</div>
    const permission = await api.post.staffPermission.query({userId: session?.user.id})
    if (!permission?.admin) return <p>You aren't allowed to be here!</p>
    
  return (
    <div>
      <p>If I did this right, you are {session.user.name}, are set as {session.user.role}, and have access as {permission.admin && "Administrator"}</p>
        <UserPull />
    </div>
  )
}


/*
Components for Admin:
- User Search, pulls all records of users
- Post Query, pulls all posts and their permissions
Linking to post form is fine

Activation button for new members
edit user/post forms

*/