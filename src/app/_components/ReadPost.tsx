// Generate posts based on context (Staff messages, guild messages, etc)

import Link from 'next/link'
import React from 'react'

export default function ReadPost() {
// DB pull for all relevant post info
// Map out short title, post date, linkable to:
// Actual post modal for full post
// Pass Props for correct page (staff, admin, account)
// const page = props.page
// const id = .id
  return (
    <div>
        {dataBase.posts.map(post => {
            <Link href={`/${page}/${post.id}`}><p>Post: {post.title} {post.pub_date}</p></Link>
        })}
    </div>
  )
}
