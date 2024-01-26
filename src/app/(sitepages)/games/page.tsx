import Link from 'next/link'
import React from 'react'

export default function GamePage() {
  return (
    <div>
      <p>Game listing</p>
      <Link href="/games/eso">Go to ESO</Link>
      <Link href="/games/ffxiv">Go to FFXIV</Link>
      <Link href="/games/swtor">Go to SWTOR</Link>
      <p>Apply to guild for games</p>
    </div>
  )
}
