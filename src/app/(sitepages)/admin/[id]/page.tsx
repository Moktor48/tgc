import React from 'react'
import { getServerAuthSession } from '~/server/auth'
import { useRouter } from 'next/navigation'

export default async function Page( { params }: {params: { id: string } }) {
  const session = await getServerAuthSession()
  const router  = useRouter()
  if(!session || session.user.role != "admin"){
    router.push('/')
  }
  
  return (
    <div>Private Admin Page</div>
  )
}
