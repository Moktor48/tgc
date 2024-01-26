import React from 'react'
import PostForm from '~/app/_components/PostForm'
import { getServerAuthSession } from '~/server/auth'

export default async function page({ params }: {params: { id: string } }) {
  const id = params.id
  const session = await getServerAuthSession()
  if (!session) return null
  return (
    <div>
      <PostForm 
        game="eso"
        userId={id}
        />
    </div>
  )
}
