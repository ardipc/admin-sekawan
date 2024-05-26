"use client";
import { useState } from "react";
import Admin from "./admin";
import Member from "./member";

export default function Tab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'People', link: '/users/tab/admin' },
    { title: 'Goods', link: '/users/tab/membership' },
  ];

  return (
    <>
      <div className="tabs tabs-bordered">
        {
          tabs.map((item, index) => (
            <a onClick={() => setActiveTab(index)} key={`item-${index}`} className={`tab tab-lg tab-bordered text-sm font-bold ${index === activeTab ? 'tab-active' : ''}`}>{item.title}</a>
          ))
        }
      </div>
      {activeTab === 0 && <Admin />}
      {activeTab === 1 && <Member />}
    </>
  )
}
