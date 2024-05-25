"use client";
import { useState } from "react";
import PVFacilities from "./facilities";
import PVTicket from "./ticket";

export default function PVTab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Facilities', link: '/users/tab/membership/public' },
    { title: 'Event Ticket Purchase', link: '/users/tab/membership/event' },
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
      {activeTab === 0 && <PVFacilities />}
      {activeTab === 1 && <PVTicket />}
      {/* {activeTab === 2 && <Role />} */}
    </>
  )
}
