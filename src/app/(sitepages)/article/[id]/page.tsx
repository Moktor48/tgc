import React from 'react'

export default function page({ params }: {params: { id: string } }) {
    const id = params.id
    console.log(id)
  return (
    <div>Article display page<p>This is article #{id}</p></div>
    
  )
}
