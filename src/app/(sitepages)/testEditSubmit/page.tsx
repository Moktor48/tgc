import PostSubmit from '~/app/_components/PostSubmit'
import React from 'react'
import { getServerAuthSession } from '~/server/auth'

export default async function page() {
  const session = await getServerAuthSession()
  if (!session) return null
  return (
    <div>
        <PostSubmit
          userId={session?.user.id}
        />
    </div>
  )
}
