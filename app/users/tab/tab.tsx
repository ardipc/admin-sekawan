"use client";
import { useState } from "react";
import Admin from "./admin";
import Role from "./role";
import Member from "./membership/tab";

export default function Tab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Admin', link: '/users/tab/admin' },
    { title: 'Membership', link: '/users/tab/membership/tab' },
    { title: 'Role & Hak Akses', link: '/users/tab/role' },
  ];

  return (
    <>
        <div className="tabs">
            {
            tabs.map((item, index) => (
              <a onClick={() => setActiveTab(index)} key={`item-${index}`} className={`tab tab-lg tab-bordered text-sm font-bold ${index === activeTab ? 'tab-active' : ''}`}>{item.title}</a>
            ))
            }
        </div>
      {activeTab === 0 && <Admin />}
      {activeTab === 1 && <Member />}
      {activeTab === 2 && <Role />}
    </>
  )
}
