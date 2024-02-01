import Link from 'next/link'
import React from 'react'

export default function GamePage() {
  return (
    <div>
      <p className="text-white">Game listing</p>
      <Link className="text-white" href="/games/eso">Go to ESO</Link><br />
      <Link className="text-white" href="/games/ffxiv">Go to FFXIV</Link><br />
      <Link className="text-white" href="/games/swtor">Go to SWTOR</Link><br />
      <p>Apply to guild for games</p>
    </div>
  )
}
