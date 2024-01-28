import Link from 'next/link'
import React from 'react'
import { getServerAuthSession } from '~/server/auth'

export default async function page({ params }: {params: { id: string } }) {
  const id = params.id
  const session = await getServerAuthSession()
  if (!session) return null
  return (
    <div>
      <Link href="/editor" className="text-white">POST FORM</Link>
    </div>
  )
}
