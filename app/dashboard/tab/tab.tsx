"use client";
import { useState } from "react";
import PreBook from "./prebook";
import PostEvent from "./postevent";
import TicketEvent from "./ticket/ticketevent";

export default function Tab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Request', link: '/dashboard/tab/prebook' },
    { title: 'Approval', link: '/dashboard/tab/postevent' },
    { title: 'Vehicles', link: '/dashboard/tab/ticketevent' },
  ];

  return (
    <>
      <div className="tabs mt-4">
        {
          tabs.map((item, index) => (
            <a onClick={() => setActiveTab(index)} key={`item-${index}`} className={`tab tab-lg tab-bordered text-sm font-bold ${index === activeTab ? 'tab-active' : ''}`}>{item.title}</a>
          ))
        }
      </div>
      {activeTab === 0 && <PreBook />}
      {activeTab === 1 && <PostEvent />}
      {activeTab === 2 && <TicketEvent />}
    </>
  )
}
