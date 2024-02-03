import Link from 'next/link'
import React from 'react'
import { getServerAuthSession } from '~/server/auth'
import { api } from '~/trpc/server'

export default async function page({ params }: {params: { id: string } }) {
  const getPost = await api.get.getPost.query({ postId: params.id })
  const id = params.id
  const session = await getServerAuthSession()
  if (!session) return null
  return (
    <div>
      <p className="text-white">Hello {session.user.name}!</p>
      <p className="text-white text-3xl">Current published posts</p>
      <Link href={`/editor?${id}`} className="text-white">Click to run editor</Link>
      { session.user.role === "staff" && <Link href={`/editor?${id}`} className="text-white">Click to run editor</Link> }
    </div>
  )
}

/* 
Editor should be visible to staff.
*/
