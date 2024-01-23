import Link from 'next/link'
import React from 'react'

export default function GamePage() {
  return (
    <div>
      <p>Game listing</p>
      <Link href="/games/eso"></Link>
      <Link href="/games/ffxiv"></Link>
      <Link href="/games/swtor"></Link>
      <p>Apply to guild for games</p>
    </div>
  )
}
