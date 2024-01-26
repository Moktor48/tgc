import React from 'react'
import PostForm from '~/app/_components/PostForm'

export default function page({ params }: {params: { id: string } }) {
  const id = params.id  
  return (
    <div>
      <PostForm 
        game="ffxiv"
        userId={id}
        />
    </div>
  )
}