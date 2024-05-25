"use client";
import { useState } from "react";
import AboutJIS from "./about";
import HistoryJIS from "./history";
import HowToGet from "./htg";
import Terms from "./tnc";
import SiteMapPage from "./site";

export default function About() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { title: 'About JIS', link: '/content/tab/about/tab/' },
    { title: 'History JIS', link: '/content/tab/about/tab/' },
    { title: 'Site Map', link: '/content/tab/about/tab/' },
    { title: 'How To Get', link: '/content/tab/about/tab/' },
    { title: 'Terms & Condition', link: '/content/tab/about/tab/' },
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
      {activeTab === 0 && <AboutJIS />}
      {activeTab === 1 && <HistoryJIS />}
      {activeTab === 2 && <SiteMapPage />}
      {activeTab === 3 && <HowToGet />}
      {activeTab === 4 && <Terms />}
    </>
  )
}
