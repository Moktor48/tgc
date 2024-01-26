import PostSubmit from '~/app/_components/PostSubmit'
import React from 'react'
import { getServerAuthSession } from '~/server/auth'

export default async function page(template, game) {
  const session = await getServerAuthSession()

  if (!session) return null
  return (
    <div>
        <PostSubmit
          session={session}
        />
    </div>
  )
}
