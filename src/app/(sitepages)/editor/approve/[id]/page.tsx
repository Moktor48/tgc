import React from 'react'
import { getServerAuthSession } from '~/server/auth'
import { api } from '~/trpc/server'

export default async function page({params}: {params: {id: string}}) {
    const session = await getServerAuthSession()
    const id = params.id
    const post = await api.post.getPost.query({postId: id})
    if (!session) return <div>You must be logged in to view this page.</div>
    if (!post) return null

  return (
    <div>
        <h1>Title: {post.title}</h1>
        <div>{post.post}</div>
        <form>
            <input type="checkbox"></input>

        </form>
    </div>
  )
}
