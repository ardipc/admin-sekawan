"use client";
import { HomeIcon, ArchiveBoxIcon, DocumentTextIcon, UsersIcon, FilmIcon, Bars3Icon }  from '@heroicons/react/24/solid'
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const menus = [
    {
      name: 'Dashboard',
      icon: (css: string) => <HomeIcon className={`h-6 w-6 ${css}`} />,
      link: '/dashboard'
    },
    {
      name: 'Events',
      icon: (css: string) => <ArchiveBoxIcon className={`h-6 w-6 ${css}`} />,
      link: '/events'
    },
    {
      name: 'Users',
      icon: (css: string) => <UsersIcon className={`h-6 w-6 ${css}`} />,
      link: '/users'
    },
    {
      name: 'Contents',
      icon: (css: string) => <DocumentTextIcon className={`h-6 w-6 ${css}`} />,
      link: '/content'
    }
  ];

  return (
    <div className="drawer-side">
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <div className="flex justify-center py-3 shadow-lg">
        <img src="/images/logo-red-1.png" alt="Gambar" />
      </div>
      <ul className="menu w-64 bg-base-100 text-base-content gap-y-2 ps-3">
        <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden" >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>
        {
          menus.map((item, index) => (
            <li key={`index-${index}`}><Link href={item.link}>{item.icon(pathname.startsWith(item.link) ? 'text-primary' : 'text-gray-400')} &nbsp; {item.name}</Link></li>
          ))
        }
      </ul>
    </div>
  )
}