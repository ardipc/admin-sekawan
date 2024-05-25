"use client";
import { useState } from "react";
import Public from "./public";
import Events from "./event";

export default function Member() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Public Visitor', link: '/users/tab/membership/public' },
    { title: 'Event Organizer', link: '/users/tab/membership/event' },
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
      {activeTab === 0 && <Public />}
      {activeTab === 1 && <Events />}
      {/* {activeTab === 2 && <Role />} */}
    </>
  )
}
