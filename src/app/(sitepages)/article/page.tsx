import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div>
      <p>Article link page</p>
      <Link href="/article/1">Article 1</Link>
      <br />
      <Link href="/article/2">Article 2</Link>
      <br />
      <Link href="/article/3">Article 3</Link>

    </div>
  )
}
