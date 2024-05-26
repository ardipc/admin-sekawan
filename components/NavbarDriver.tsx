"use client";
import { HomeIcon, ArchiveBoxIcon }  from '@heroicons/react/24/solid'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

export default function NavbarDriver({ user }: { user: User }) {
  const router = useRouter()

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient<Database>();

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const pathname = usePathname();

  const menus = [
    {
      name: 'Dashboard',
      icon: (css: string) => <HomeIcon className={`h-6 w-6 ${css}`} />,
      link: '/manager'
    },
    {
      name: 'Request',
      icon: (css: string) => <ArchiveBoxIcon className={`h-6 w-6 ${css}`} />,
      link: '/manager/request'
    },
  ];

  return (
    <div className="navbar bg-base-100 border-b">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href={`/driver/request`}>Request</Link></li>
            <li><Link href={`/driver/vehicles`}>Vehicles</Link></li>
            <li><Link href={`/driver/bbm`}>BBM</Link></li>
            <li><Link href={`/driver/service`}>Service</Link></li>
            <li><Link href={`/driver/usage`}>Usage</Link></li>
          </ul>
        </div>
        <Link href={`/driver`} className="btn btn-ghost text-xl text-red-600">SEKAWAN</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href={`/driver/request`}>Request</Link></li>
          <li><Link href={`/driver/vehicles`}>Vehicles</Link></li>
          <li><Link href={`/driver/bbm`}>BBM</Link></li>
          <li><Link href={`/driver/service`}>Service</Link></li>
          <li><Link href={`/driver/usage`}>Usage</Link></li>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        {
          user ? 
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={`https://ui-avatars.com/api/?name=${user?.email}&background=AE171E&color=fff`} alt="User" />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link href={`/`}>{user ? user.user_metadata.name : "Administrator"}</Link></li>
                <li><Link href={`/`}>{user ? user.email : "admin@doe.com"}</Link></li>
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