import { Bars3Icon }  from '@heroicons/react/24/solid'
import Link from "next/link";
import LogoutButton from './LogoutButton';
import { User } from '@supabase/supabase-js';

export default function Header({ user }: { user?: User; }) {
  return (
    <div className="navbar sticky top-0 flex justify-between bg-base-100 z-10 shadow-md">

      {/* Menu toogle for mobile view or small screen */}
      <div className="">
        <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
          <Bars3Icon className="h-5 inline-block w-5" />
        </label>
        <h1 className="text-2xl font-semibold ml-2">Dashboard</h1>
      </div>

      <div className="order-last">
        {/* Profile icon, opening menu on click */}
        <div className="dropdown dropdown-end ml-4">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={`https://ui-avatars.com/api/?name=${user ? user.user_metadata.name : "Administrator"}&background=AE171E&color=fff`} alt="User" />
            </div>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li className="justify-between">
              <Link href={'/'}>
                {user ? user.user_metadata.name : "Administrator"}
              </Link>
            </li>
            <li className="justify-between">
              <Link href={'/'}>
                {user ? user.email : "Administrator"}
              </Link>
            </li>
            <div className="divider mt-0 mb-0"></div>
            <li><LogoutButton /></li>
          </ul>
        </div>
      </div>
    </div>
  )
}