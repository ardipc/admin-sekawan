"use client";
import { useState } from "react";
import Standard from "./standard";
import Vip from "./vip";
import Vvip from "./vvip";

export default function TabTicket() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Standard', link: '/dashboard/tab/ticket/standard' },
    { title: 'VIP', link: '/dashboard/tab/ticket/vip' },
    { title: 'VVIP', link: '/dashboard/tab/ticket/vvip' },
  ];

  return (
    <>
        <div className="tabs">
            {
            tabs.map((item, index) => (
              <a onClick={() => setActiveTab(index)} key={`item-${index}`} className={`tab tab-lg w-1/3 tab-bordered text-sm font-bold ${index === activeTab ? 'tab-active' : ''}`}>{item.title}</a>
            ))
            }
        </div>
      {activeTab === 0 && <Standard />}
      {activeTab === 1 && <Vip />}
      {activeTab === 2 && <Vvip />}
    </>
  )
}
