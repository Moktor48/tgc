import { db } from '~/server/db';
import { getServerAuthSession } from '~/server/auth';
import Link from 'next/link'
import Image from 'next/image';

export default async function NavBar() {
  const session = await getServerAuthSession()
  const user = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
  })
  const role = user?.role;
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

  return (
    <div className='flexCont inline-flex bg-gradient-to-r from-indigo-500'>
        <p className='items-end mx-5 flex-row-reverse'><Link href="/">Home</Link></p>
        <p className='items-end mx-5 flex-row-reverse'><Link href="/games">Games</Link></p>
        <p className='items-end mx-5 flex-row-reverse'><Link href="/calendar">Calendar</Link></p>
        { session.user.role != "" && <p className='items-end mx-5 flex-row-reverse'><Link href="/account">Account</Link></p>}
        { session.user.role === "officer" && <p className='items-end mx-5 flex-row-reverse'><Link href="/officer">Officer</Link></p>}
        { role === "admin" && <p className='items-end mx-5 flex-row-reverse'><Link href="/admin">Admin</Link></p>}
        <p className='items-end mx-5 flex-row-reverse'><Link href="/api/auth/signout?callbackUrl=/">Sign-out from user: {session.user.name}</Link></p>
        <Image src={session.user.image} width={40} height={40} className='rounded-full' alt="Discord Avatar" />
    </div>
  )
}


//Link all pages here