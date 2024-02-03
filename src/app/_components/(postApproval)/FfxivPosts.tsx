import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import React from 'react'
import Link from "next/link";

export default async function FfxivPosts() {
    const session = await getServerAuthSession()
        if (!session) return <div>You must be logged in to view this page.</div>
        const id = session.user.id
        const ffxivPerms = await api.post.ffxivPermission.query({ userId: id })
        if (!ffxivPerms) return <div className="text-3xl text-yellow-500">LOCKED: No access to FFXIV-specific posts!</div>
        if (!ffxivPerms.raidlead && !ffxivPerms.mentor && ffxivPerms.rank != "officer") return null
    const unpubPost = await api.post.unpublishedPostsFfxiv.query()
  return (
    <div className="text-center">
      <h1 className="text-white">UnPublished Posts for ESO</h1>
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