import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import React from 'react'
import Link from "next/link";

export default async function GenPosts() {
    const session = await getServerAuthSession()
        if (!session) return <div>You must be logged in to view this page.</div>
        const unpubPost = await api.post.unpublishedPosts.query()
  return (
    <div className="text-center">
      <h1 className="text-white">UnPublished Posts for the General Guild</h1>
      {unpubPost.map((post: { id: string; title: string; createdBy: { name: string  }; }) => {
        return (
          <div>
            <Link className="link" href={`./approve/${post.id}?title=${post.title}`}><p key={post.id}>Title: {post.title} Created by: {post.createdBy.name}</p></Link>
          </div>
        )
      })}
    </div>
  )
}
