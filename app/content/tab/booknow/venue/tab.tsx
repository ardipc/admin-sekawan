"use client";
import { useState } from "react";
import Venue from "./venue";
import AddVenue from "./addvenue";

export default function TabVenue() {
  const [activeTab, setActiveTab] = useState(0);
  const [item, setItem] = useState<any>(null);

  return (
    <>
        {activeTab === 0 && <Venue setActive={setActiveTab} setItem={setItem} />}
        {activeTab === 1 && <AddVenue setActive={setActiveTab} item={item} />}
      {/* {activeTab === 2 && <News />} */}
      {/* {activeTab === 3 && <Kontak />} */}
      {/* {activeTab === 5 && <ListAcc />} */}
    </>
  )
}
