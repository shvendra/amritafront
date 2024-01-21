"use client"

import Link from 'next/link'
import MobileMenu from './mobile-menu'
import Image from 'next/image'
import logo1 from '@/public/images/logo.png'
import {useEffect, useState } from "react";
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter();
  const [islogin, setlogin] = useState(false);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const interval = setInterval(() => {
      if(localStorage.getItem("token")) {
        setlogin(true)
      }    }, 10);
    
    // Update the document title using the browser API
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setlogin(false)

    router.push('/signin')

};
  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link href="/" className="block" aria-label="Cruip">
            <Image className="max-w-full mx-auto md:max-w-none h-auto" src={logo1} width={300} height={200} alt="logo 01" />

              
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop sign in links */}
            <ul className="flex grow justify-end flex-wrap items-center">
                

              {!islogin? (
                    <>
                        <li>
                <Link
                  href="/signin"
                  className="font-medium text-purple-600 hover:text-gray-200 px-4 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </Link>
              </li>
              <li>
                <Link href="/signup" className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3">
                  Sign up
                </Link>
              </li>
                    </>
                ) : (
                    <>
                        <li>
                <Link href="/profile" className=" hover:bg-purple-700">
                <svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="profile"><path fill="#2b2e63" d="M32 0C14.4 0 0 14.4 0 32s14.4 32 32 32c17.7 0 32-14.4 32-32S49.7 0 32 0zm0 62.1C15.4 62.1 1.9 48.6 1.9 32S15.4 1.9 32 1.9 62.1 15.4 62.1 32 48.6 62.1 32 62.1z"></path><path fill="#ededed" d="M32 1.9C15.4 1.9 1.9 15.4 1.9 32S15.4 62.1 32 62.1 62.1 48.6 62.1 32 48.6 1.9 32 1.9zm0 10.8c4.8 0 8.8 3.9 8.8 8.8 0 4.8-3.9 8.8-8.8 8.8-4.8 0-8.8-3.9-8.8-8.8.1-4.8 4-8.8 8.8-8.8zm15.9 37.7H16.1c-.5 0-1-.4-1-1 0-9.3 7.6-16.9 16.9-16.9 9.3 0 16.9 7.6 16.9 16.9 0 .6-.4 1-1 1z"></path><path fill="#d6d6d6" d="M32 1.9C15.4 1.9 1.9 15.4 1.9 32S15.4 62.1 32 62.1 62.1 48.6 62.1 32 48.6 1.9 32 1.9zm0 58.2C16.5 60.1 3.9 47.5 3.9 32S16.5 3.9 32 3.9 60.1 16.5 60.1 32 47.5 60.1 32 60.1z"></path><path fill="#2b2e63" d="M32 32.5c-9.3 0-16.9 7.6-16.9 16.9 0 .5.4 1 1 1H48c.5 0 1-.4 1-1-.1-9.3-7.7-16.9-17-16.9zm-14.9 16c.5-7.8 7-14 14.9-14s14.4 6.2 14.9 14H17.1z"></path><path fill="#f26e61" d="M46.9 48.5H17.1c.5-7.8 7-14 14.9-14s14.4 6.2 14.9 14z"></path><path fill="#2b2e63" d="M32 12.7c-4.8 0-8.8 3.9-8.8 8.8 0 4.8 3.9 8.8 8.8 8.8 4.8 0 8.8-3.9 8.8-8.8 0-4.8-4-8.8-8.8-8.8zm0 15.6c-3.8 0-6.8-3-6.8-6.8s3.1-6.8 6.8-6.8c3.8 0 6.8 3.1 6.8 6.8s-3 6.8-6.8 6.8z"></path><path fill="#ffe5ab" d="M38.8 21.5c0 3.8-3.1 6.8-6.8 6.8-3.8 0-6.8-3-6.8-6.8s3.1-6.8 6.8-6.8c3.8 0 6.8 3 6.8 6.8z"></path><path fill="#e15e5a" d="M32 34.5c-7.9 0-14.4 6.2-14.9 14H47c-.6-7.8-7.1-14-15-14zm0 1.5c6.5 0 12.1 4.7 13.2 11H18.8c1.1-6.3 6.7-11 13.2-11z"></path><path fill="#f0d39a" d="M32 14.7c-3.8 0-6.8 3.1-6.8 6.8s3.1 6.8 6.8 6.8c3.8 0 6.8-3 6.8-6.8s-3-6.8-6.8-6.8zm0 12.1c-2.9 0-5.3-2.4-5.3-5.3s2.4-5.3 5.3-5.3 5.3 2.4 5.3 5.3-2.4 5.3-5.3 5.3z"></path></svg>
                               </Link>
              </li>
              <li onClick={logout} >
                <a className='boldfont' href='#' > Logout</a>
              </li>
                    </>
                )}




             
            </ul>
          </nav>

          <MobileMenu />

        </div>
      </div>
    </header>
  )
}
