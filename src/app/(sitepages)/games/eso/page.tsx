import Link from 'next/link'
import React from 'react'
import { getServerAuthSession } from '~/server/auth'

export default async function page() {
  const session = await getServerAuthSession()
  const id = session?.user.id
  return (
    <div>
      <Link href={`/games/eso/${id}`}>Member Page!</Link>
    </div>

  )
}
