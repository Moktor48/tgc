//This is the lead page for editor submissions. 
import React from 'react'
import PostForm from '~/app/_components/(postSubmission)/PostForm'
import { getServerAuthSession } from '~/server/auth'

export default async function page() {
  const session = await getServerAuthSession()
  if (!session) return null
  const id = session.user.id
  return (
    <div>
      <PostForm 
        userId={id}
        />
    </div>
  )
}