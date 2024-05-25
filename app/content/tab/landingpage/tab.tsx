"use client";
import { useState } from "react";
import Banner from "./banner";
import Activities from "./activities";
import Poster from "./poster";
import InstagramFeeds from "./ig";

export default function Landing() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'Banner', link: '/content/tab/landingpage/tab/banner' },
    { title: 'Activities', link: '/content/tab/landingpage/tab/activities' },
    { title: 'Pop Up Poster', link: '/content/tab/landingpage/tab/poster' },
    { title: 'Instagram Feeds', link: '/content/tab/landingpage/tab/poster' },
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
      {activeTab === 0 && <Banner />}
      {activeTab === 1 && <Activities />}
      {activeTab === 2 && <Poster />}
      {activeTab === 3 && <InstagramFeeds />}
    </>
  )
}
