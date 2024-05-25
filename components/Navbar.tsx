"use client";

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from "next/link";

import type { User } from "@supabase/supabase-js";

export default function Navbar({ user }: { user: User | null; }) {
  const router = useRouter()

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient()

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const menus = [
    {
      title: 'Venue',
      link: '/venue',
      subs: [
        {
          title: 'About',
          link: '/venue/about'
        },
        {
          title: 'History',
          link: '/venue/history'
        },
        {
          title: 'Site Map',
          link: '/venue/sitemap'
        },
        {
          title: 'How To Get',
          link: '/venue/how'
        },
        {
          title: 'Term & Conditions',
          link: '/venue/toc'
        },
      ]
    },
    {
      title: 'News',
      link: '/news'
    },
    {
      title: 'Event',
      link: '/event',
      subs: [
        {
          title: 'Now Showing',
          link: '/event/now',
        },
        {
          title: 'Incoming',
          link: '/event/incoming',
        },
        {
          title: 'Past',
          link: '/event/past',
        }
      ]
    },
    {
      title: 'Membership',
      link: '/register'
    },
    {
      title: 'Contact',
      link: '/contact'
    },
  ];

  return (
    <div className="navbar sticky top-0 z-[1] bg-base-100 he-96 lg:px-32 border-b-2 border-b-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {
              menus.map((item, index) => {
                if (item.subs) {
                  return (
                    <li>
                      <a>{item.title}</a>
                      <ul className="p-2">
                        {
                          item.subs.map((item, index) => (
                            <li key={`sub-${index}`}><Link href={item.link}>{item.title}</Link></li>
                          ))
                        }
                      </ul>
                    </li>
                  )
                } else {
                  return (
                    <li><Link href={item.link}>{item.title}</Link></li>
                  )
                }
              })
            }
          </ul>
        </div>
        <Link href={`/`} className="btn btn-ghost normal-case text-xl">
          <img src="/images/logo-red-1.png" alt="Logo" />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {
            menus.map((item, index) => {
              if (item.subs) {
                return (
                  <li tabIndex={0} className='z-[1]'>
                    <details tabIndex={0}>
                      <summary>{item.title}</summary>
                      <ul className="p-2 w-52">
                        {
                          item.subs.map((item, index) => (
                            <li key={`sub-${index}`}><Link href={item.link}>{item.title}</Link></li>
                          ))
                        }
                      </ul>
                    </details>
                  </li>
                )
              } else {
                return (
                  <li><Link href={item.link}>{item.title}</Link></li>
                )
              }
            })
          }
        </ul>
      </div>
      <div className="navbar-end gap-3">
        <details className="dropdown hidden lg:flex">
          <summary className="m-1 btn btn-primary text-white">
            Book Now
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.91162 1.5L6.34438 6.5L10.7771 1.5" stroke="white" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round"/>
            </svg>
          </summary>
          {
            user ? 
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                {
                  user?.user_metadata.role === 'Event Organizer' ? <>
                    <li><Link href={`/info-eo`}>Pre Booking</Link></li>
                    <li><Link href={`/info-eo-2`}>Create Event</Link></li>
                  </> :
                  <li><Link href={`/bookfac`}>Booking Facilities</Link></li>
                }
              </ul>
              :
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                <li><Link href={`/bookfac`}>Booking Facilities</Link></li>
                <li><Link href={`/bookfac`}>Pre Booking</Link></li>
                <li><Link href={`/bookfac`}>Create Event</Link></li>
              </ul>
          }
        </details>
        {
          user ? 
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.user_metadata.photo ? user.user_metadata.photo : `https://ui-avatars.com/api/?name=${user?.email}&background=AE171E&color=fff`} alt="User" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {
                  user?.user_metadata.role === 'Event Organizer' ? <>
                    <li className='lg:hidden'><Link href={`/info-eo`}>Pre Booking</Link></li>
                    <li className='lg:hidden'><Link href={`/info-eo-2`}>Create Event</Link></li>
                  </> :
                  <li className='lg:hidden'><Link href={`/bookfac`}>Booking Facilities</Link></li>
                }
                <li><Link href={`/profile`} className="justify-between">Profile</Link></li>
                <li><a onClick={() => signOut()}>Logout</a></li>
              </ul>
            </div>
            :
            <Link className='btn btn-sm btn-primary lg:hidden me-3' href={`/signin`}>Sign In</Link>
        }
      </div>
    </div>
  )
}