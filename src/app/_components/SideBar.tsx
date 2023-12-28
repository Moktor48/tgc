"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getSession } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function SideBar() {
  const [session, setSession] = useState()

  useEffect(() => {
    getSession().then((session) => {
      setSession(session)
    }) .catch((err) => {
      console.error(err)
    }
  )}, [])

  const [sidebar, setSidebar] = useState(false) 
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth < 600 && sidebar) {
            setSidebar(false)
        }
    }
    window.addEventListener('resize', handleResize)
    return () => 
        window.removeEventListener('resize', handleResize)
    }, [sidebar])
  
    console.log(session)


    // Session is not valid
    if(true){
    return (
        <div>
        <button onClick={()=> setSidebar(!sidebar)} className="nav-button">
        <span className="menu-button material-symbols-outlined">{sidebar? "Close":"Menu"}</span>
        </button>
        <nav className={`nav ${sidebar ? "nav-open":"nav-closed"}`}>


        <ul>
            <li><Link className="links" href="/"><span className="material-symbols-outlined">Home</span> Home</Link></li>
            <li><Link className="links" href="/"><span className="material-symbols-outlined">Casino</span> Games</Link></li>
            <li><Link className="links" href="/"><span className="material-symbols-outlined">Leaderboard</span>Leaderboard</Link></li>
            <li><Link className="links" href="/"><span className="material-symbols-outlined">Calendar_Month</span> Calendar</Link></li>
            <li><Link className="links" href="/api/auth/signin"><span className="material-symbols-outlined">Login</span> Sign-in</Link></li>
        </ul>
        </nav>

        </div>
    
    )}
// Session is valid






  return (
    <div>
    <button onClick={()=> setSidebar(!sidebar)} className="nav-button">
    <span className="menu-button material-symbols-outlined">{sidebar? "Close":"Menu"}</span>
    </button>
    <nav className={`nav ${sidebar ? "nav-open":"nav-closed"}`}>
        <ul>
            <li><Link className="links" href="/"><span className="material-symbols-outlined">Home</span> Home</Link></li>
            <li><Link className="links" href="/"><span className="material-symbols-outlined">Casino</span> Games</Link></li>
            <li><Link className="links" href="/"><span className="material-symbols-outlined">Leaderboard</span>Leaderboard</Link></li>

            <li><Link className="links" href="/api/auth/signout"><span className="material-symbols-outlined">Logout</span> Sign-out</Link></li>
        </ul>
    </nav>

    </div>

)}

/*
            { session.user.role != "guest" && <li><Link className="links" href="/"><span className="material-symbols-outlined">Calendar_Month</span> Calendar</Link></li>}
            { session.user.role != "guest" && <li><Link className="links" href="/"><span className="material-symbols-outlined">Person</span> Account</Link></li>}
            { session.user.role === "admin" || "staff" && <li><Link className="links" href="/"><span className="material-symbols-outlined">Supervisor_Account</span> Staff</Link></li>}
            { session.user.role === "admin" && <li><Link className="links" href="/"><span className="material-symbols-outlined">Admin_</span> Admin_Panel_Settings</Link></li>}
*/












/*


                
                <li><Link className="links" href="/"><span className="material-symbols-outlined">{link.text}</span>{link.text2}</Link></li>
                <li><Link className="links" href="/"><span className="material-symbols-outlined">{link.text}</span>{link.text2}</Link></li>
                <li><Link className="links" href="/"><span className="material-symbols-outlined">{link.text}</span>{link.text2}</Link></li>



In this case, I can take the links and filter them by the user's role.

import { db } from '~/server/db';
import { getServerAuthSession } from '~/server/auth';
import Link from 'next/link'
import Image from 'next/image';

export default async function NavBar() {
  const session = await getServerAuthSession()
  // Session is not valid
  if(!session){
    return (
      <div className='flexCont inline-flex bg-gradient-to-r from-indigo-500'>
        <p className='items-end mx-5 flex-row-reverse'><Link href="/">Home</Link></p>
        <p className='items-end mx-5 flex-row-reverse'><Link href="/games">Games</Link></p>
        <p className='items-end mx-5 flex-row-reverse'><Link href="/calendar">Calendar</Link></p>
        <p className='items-end mx-5 flex-row-reverse'><Link href="/api/auth/signin">Sign-in</Link></p>
      </div>
    )
  }
  // Session is valid
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  })
  const role = user?.role;
  const id = user?.id;
  return (
    <div className='flexCont inline-flex bg-gradient-to-r from-indigo-500'>
        <p className='items-end mx-5 flex-row-reverse'><Link href="/">Home</Link></p>
        <p className='items-end mx-5 flex-row-reverse'><Link href="/games/">Games</Link></p>
        <p className='items-end mx-5 flex-row-reverse'><Link href={`/calendar/${id}`}>Calendar</Link></p>
        { session.user.role != "" && <p className='items-end mx-5 flex-row-reverse'><Link href={`/account/${id}`}>Account</Link></p>}
        { session.user.role === "officer" || "admin" && <p className='items-end mx-5 flex-row-reverse'><Link href={`/officer/${id}`}>Officer</Link></p>}
        { role === "admin" && <p className='items-end mx-5 flex-row-reverse'><Link href={`/admin/${id}`}>Admin</Link></p>}
        <p className='items-end mx-5 flex-row-reverse'><Link href="/api/auth/signout?callbackUrl=/">Sign-out from user: {session.user.name}</Link></p>
        <Image src={session.user.image} width={40} height={40} className='rounded-full' alt="Discord Avatar" />
    </div>
  )
}
*/