import React from 'react'
import { getServerAuthSession } from '~/server/auth'
import { api } from '~/trpc/server'
import PostSelect from './PostSelect'

interface Props {
    userId: string
    game: string
}



export default async function PostForm({userId, game}: Props) {
    const session = await getServerAuthSession()
    const STAFF = await api.post.staffPermission.query({userId})
    const ESO = await api.post.esoPermission.query({userId})
    const FFXIV = await api.post.ffxivPermission.query({userId})
    const SWTOR = await api.post.swtorPermission.query({userId})
    if (!session) return null
    console.log(ESO)
  return (
    <div>
      <PostSelect
        game={game}
        userId={userId}
        session={session}
        staff={STAFF}
        eso={ESO}
        ffxiv={FFXIV}
        swtor={SWTOR}
      />
    </div>
  )
}

