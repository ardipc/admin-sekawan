"use client";
import { useState } from "react";
import Landing from "./landingpage/tab";
import About from "./about/tab";
import Kontak from "./contact/kontak";
import ListAcc from "./accnumber/listacc";
import Tabnews from "./news/tab";
import TabBookNow from "./booknow/tab";

export default function Tab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Landing Page', link: '/content/tab/landingpage/tab' },
    { title: 'About Venue', link: '/content/tab/about/tab' },
    { title: 'News', link: '/content/tab/news/tab' },
    { title: 'Contact', link: '/content/tab/contact/kontak' },
    { title: 'Book Now', link: '/content/tab/booknow/tab' },
    { title: 'Account Number', link: '/content/tab/accnumber' },
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
      {activeTab === 0 && <Landing />}
      {activeTab === 1 && <About />}
      {activeTab === 2 && <Tabnews />}
      {activeTab === 3 && <Kontak />}
      {activeTab === 4 && <TabBookNow />}
      {activeTab === 5 && <ListAcc />}
    </>
  )
}
