"use client";
import { useState } from "react";
import TabVenue from "./venue/tab";
import PreEvent from "./pre/preevent";
import CreateEvent from "./create/createevent";
import TabFacilities from "./facilities/tab";

export default function TabBookNow() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'List Venue', link: '/content/tab/booknow/venue/venue' },
    { title: 'List Facilities', link: '/content/tab/booknow/venue/venue' },
    { title: 'Pre Event', link: '/content/tab/booknow/preevent' },
    { title: 'Create Event', link: '/content/tab/booknow/createevent' },
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
      {activeTab === 0 && <TabVenue />}
      {activeTab === 2 && <PreEvent />}
      {activeTab === 3 && <CreateEvent />}
      {activeTab === 1 && <TabFacilities />}
      {/* {activeTab === 5 && <ListAcc />} */}
    </>
  )
}
