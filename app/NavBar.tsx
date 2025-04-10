import React from 'react'
import Link from 'next/link'

const NavBar = () => {
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
          </ul>
        </nav>
  )
}

export default NavBar