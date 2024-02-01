import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import React from 'react'
import Link from "next/link";
interface Post {
    title: string;
    id: string;
    createdBy: {
        name: string;
        id: string;
    };
    permissions: {
        eso: boolean;
    }[];
}[]

export default async function EsoPosts() {
  const session = await getServerAuthSession()
  if (!session) return <div>You must be logged in to view this page.</div>
  const id = session.user.id
  const esoPerms = await api.post.esoPermission.query({ userId: id })
  if (!esoPerms) return <div>You must be a member of the ESO Discord to view this page.</div>
  if (!esoPerms.raidlead && !esoPerms.mentor && esoPerms.rank != "officer") return null
  const unpubPostEso = await api.post.unpublishedPostsEso.query()
  console.log(unpubPostEso)
  return (
    <div>
      <h1 className="text-white">UnPublished Posts for ESO</h1>
      {unpubPostEso.map((post: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; createdBy: { name: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }) => {
        return (
          <div>
            <Link href={`./approve/${post.id}`}><p key={post.id}>Title: {post.title} Created by: {post.createdBy.name}</p></Link>
          </div>
        )
      })}
    </div>
  )
}
