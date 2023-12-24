"use client"
import React from 'react'
import { api } from '~/trpc/react'
import { useSession } from 'next-auth/react';

export default function SecretMessage() {
    const session = useSession();
    const SecMes = api.post.getSecretMessage.useQuery();
    if (!session) {
        return null
    }
  return (
    <div>
        <h1>{JSON.stringify(SecMes.data)}</h1>
    </div>
  )
}
