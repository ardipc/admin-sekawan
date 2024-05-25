"use client";
import { useState } from "react";
import EOPre from "./pre";
import EOPost from "./post";
import EOTicket from "./ticket";

export default function EOTab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Pre Event', link: '/users/tab/membership/public' },
    { title: 'Post Event', link: '/users/tab/membership/event' },
    { title: 'Ticket Event', link: '/users/tab/membership/event' },
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
      {activeTab === 0 && <EOPre />}
      {activeTab === 1 && <EOPost />}
      {activeTab === 2 && <EOTicket />}
    </>
  )
}
