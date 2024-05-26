"use client";

import { useState } from "react";
import BBM from "./bbm";

export default function Tab({ vehicle }: { vehicle: number }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'BBM', link: '/users/tab/admin' },
    { title: 'Service', link: '/users/tab/membership' },
    { title: 'Usage', link: '/users/tab/membership' },
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
      {activeTab === 0 && <BBM vehicle={vehicle} />}
      {activeTab === 1 && <BBM vehicle={vehicle} />}
      {activeTab === 2 && <BBM vehicle={vehicle} />}
    </>
  )
}
