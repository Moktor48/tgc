import Link from 'next/link'
import React from 'react'
import { api } from '~/trpc/server'


interface PullPosts{
    name: string;
    permissions: {
        eso: boolean;
        ffxiv: boolean;
        swtor: boolean;
        general: boolean;
    }[];
    id: string;
    createdBy: {
        name: string;
        id: string;
    };
}[]

interface Perm{
    eso: boolean
    ffxiv: boolean
    swtor: boolean
    general: boolean
}

export default async function page() {
    const pullPosts = await api.post.getAllPosts.query()
    if (!pullPosts) return null
    
  return (
    <div>
      {pullPosts.map((post: PullPosts) => (
        
        <Link key={post.id} href={`/post/${post.id}`}>
            <p>Author: {post.createdBy.name}</p><br />
            <p>Post Title: {post.name}</p><br />

            {post.permissions.map((perm: Perm) => (
            <p>Audience: 
              {perm.ffxiv? "FFXIV" : null}
              {perm.eso? "ESO" : null}
              {perm.swtor? "SWTOR" : null}
              {perm.general? "General" : null}
            </p>))}
        </Link>
        ))}
    </div>
  )
}
