import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

import React from 'react'

export default async function SwtorPosts() {
    const session = await getServerAuthSession()
    if (!session) return <div>You must be logged in to view this page.</div>
    const id = session.user.id
    const swtorPerms = await api.post.swtorPermission.query({ userId: id })
    if (!swtorPerms) return <div>You must be a member of the Swtor Discord to view this page.</div>
    if (!swtorPerms.raidlead && !swtorPerms.mentor && swtorPerms.rank != "officer") return null
    const unpubPostSwtor = await api.post.unpublishedPostsSwtor.query()
    return (
        <div>
            {unpubPostSwtor.map((post: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; createdBy: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }; }) => {
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