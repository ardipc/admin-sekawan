"use client";

import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Content from './dashboard/content';
import { User } from '@supabase/supabase-js';

export default function Beranda({ user }: { user: User }){

  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="left-sidebar-drawer" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content flex flex-col">
          <Header user={user} />
          <main className="flex-1 overflow-y-auto py-8 px-6 bg-red-100">
            <Content />
          </main>
        </div>

        <Sidebar />
      </div>
    </>
  )
}
