//page for approvals to be viewed by name and individual posts selected
import React from 'react'
import EsoPosts from '~/app/_components/(postApproval)/EsoPosts'
import FfxivPosts from '~/app/_components/(postApproval)/FfxivPosts'
import GenPosts from '~/app/_components/(postApproval)/GenPosts'
import SwtorPosts from '~/app/_components/(postApproval)/SwtorPosts'
import { getServerAuthSession } from '~/server/auth'

export default async function page() {
    const session = await getServerAuthSession()
    if (!session) return <p>You must be logged in to view this page.</p>
    if (session.user.role != "staff") return <p className="text-white text-3xl">You are not authorized to view this page</p>

  return (
    <div className="flex justify-center w-full">
        <div className="flex newsletter w-1/2">
            <h1 className="text-white text-center text-5xl">Post Approvals</h1><br />
            <GenPosts /><br />
            <EsoPosts /><br />
            <FfxivPosts /><br />
            <SwtorPosts /><br />
        </div>
    </div>
  )
}