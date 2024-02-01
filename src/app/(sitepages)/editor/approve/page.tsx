//page for approvals to be viewed
import React from 'react'
import EsoPosts from '~/app/_components/(postApproval)/EsoPosts'
import FfxivPosts from '~/app/_components/(postApproval)/FfxivPosts'
import SwtorPosts from '~/app/_components/(postApproval)/SwtorPosts'
import { getServerAuthSession } from '~/server/auth'
import { api } from '~/trpc/server'


export default async function page() {
    const session = await getServerAuthSession()
    if (!session) return <p>You must be logged in to view this page.</p>
    if (session.user.role != "staff") return <p className="text-white text-3xl">You are not authorized to view this page</p>
    const id = session.user.id
    //const permission = await api.post.staffPermission.query({userId: id})
    const eso = await api.post.esoPermission.query({userId: id})
    const ffxiv = await api.post.ffxivPermission.query({userId: id})
    const swtor = await api.post.swtorPermission.query({userId: id})

    // run queries on posts based on user perms Mentors, HC, Officers can approve
    // GM = ALL, HC = ALL, Raidleaders = RAID, Mentors = MENTOR, Officers = game-related posts



  return (
    <div>
        <p>Approvals</p>

        <p>Types:</p>

        <p>General/Full Guild</p>
        <p>Notifications</p>
        <p>Reports</p>
        {eso?.rank !="none" && <p>ESO</p>}
        {eso?.rank !="none" && <p>Notifications</p>}
        {eso?.rank !="none" && <p>Reports</p>}
        {eso?.rank !="none" && eso?.raidlead && <p>Raid</p>}
        {eso?.rank !="none" && <p>Guides</p>}
        {eso?.rank !="none" && <p>Builds</p>}

        {ffxiv?.rank != "none" && <p>FFXIV</p>}
        {ffxiv?.rank != "none" && <p>Notifications</p>}
        {ffxiv?.rank != "none" && <p>Reports</p>}
        {ffxiv?.rank != "none" && ffxiv?.raidlead && <p>Raid</p>}
        {ffxiv?.rank != "none" && <p>Guides</p>}
        {ffxiv?.rank != "none" && <p>Builds</p>}

        {swtor?.rank != "none" && <p>SWTOR</p>}
        {swtor?.rank != "none" && <p>Notifications</p>}
        {swtor?.rank != "none" && <p>Reports</p>}
        {swtor?.rank != "none" && swtor?.raidlead && <p>Raid</p>}
        {swtor?.rank != "none" && <p>Guides</p>}
        {swtor?.rank != "none" && <p>Builds</p>}
        <EsoPosts />
        <FfxivPosts />
        <SwtorPosts />
    </div>
  )
}

/*
const unpubPost: {
    title: string;
    id: string;
    createdBy: {
        name: string;
        id: string;
    };
    permissions: {
        eso: boolean;
        ffxiv: boolean;
        swtor: boolean;
        general: boolean;
    }[];
*/