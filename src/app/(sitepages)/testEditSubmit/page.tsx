import PostSubmit from '~/app/_components/PostSubmit'
import React from 'react'
import { getServerAuthSession } from '~/server/auth'

export default async function page() {
  const session = await getServerAuthSession()
  console.log(session)
  if (!session) return null
  return (
    <div>
        <PostSubmit
          session={session}
        />
    </div>
  )
}
