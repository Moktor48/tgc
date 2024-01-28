import React from 'react'
import { api } from '~/trpc/server'
import { getServerAuthSession } from '~/server/auth'

export default async function UserPull() {
    const parsedUsers = []
    const session = await getServerAuthSession()
    if (!session) return null
    const users = await api.post.allUsers.query()
    if (!users) return null
    async function parseUser(){
        for (let i = 0; i < users.length; i++) {
            const use = users[i]
            const userId = use!.id
            const parseUser = await api.post.fullProfile.query({userId: userId})
            parsedUsers.push(parseUser)
    } return parsedUsers
}
  return (
    <div>
        <h1>User Pull</h1>
    </div>
  )
}
