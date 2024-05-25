"use client";
import { useState } from "react";
import EOTab from "./eo/tab";
import PVTab from "./pv/tab";

export default function Tab() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { title: 'Event Organizer', link: '/users/tab/admin' },
    { title: 'Public Visitor', link: '/users/tab/membership/tab' },
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
      {activeTab === 0 && <EOTab />}
      {activeTab === 1 && <PVTab />}
    </>
  )
}
