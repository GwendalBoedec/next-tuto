"use client"
import React from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const NavBar = () => {
  const {status, data: session} = useSession();

  return (
    <nav >
          <ul className="flex p-2 bg-slate-200">
            <li className='mr-5'>
              <Link href="/"> Next.js </Link>
            </li>
            <li className='mr-5'>
            <Link href="/users"> Users </Link>
            </li >
            <li className='mr-5'>
            <Link href="/products"> Products </Link>
            </li>
            <li className='mr-5'>
            <Link href="/admin"> Admin </Link>
            </li>
            {status === "loading" && <div>Loading...</div>}
            { status === "authenticated" && 
            <div> 
              {session.user!.name} 
              <Link className="ml-3" href="/api/auth/signout"><button className='btn btn-second'>Sign Out</button></Link>
            </div>}
            { status === "unauthenticated" && <li className='mr-5'>
            <Link href="/api/auth/signin"> Login </Link>
            </li> }
          </ul>
        </nav>
  )
}

export default NavBar