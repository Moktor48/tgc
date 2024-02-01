import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import React from 'react'

export default async function FfxivPosts() {
    const session = await getServerAuthSession()
    if (!session) return <div>You must be logged in to view this page.</div>
    const id = session.user.id
    const ffxivPerms = await api.post.ffxivPermission.query({ userId: id })
    if (!ffxivPerms) return <div>You must be a member of the ESO Discord to view this page.</div>
    if (!ffxivPerms.raidlead && !ffxivPerms.mentor && ffxivPerms.rank != "officer") return null
    const unpubPostFfxiv = await api.post.unpublishedPostsFfxiv.query()
    return (
        <div>
            {unpubPostFfxiv.map((post: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; createdBy: { name: string | number | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }) => {
                return (
                    <div>
                        <p>
                            Title: {post.title},
                        </p>
                        <p>
                            Created by: {post.createdBy.name}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}