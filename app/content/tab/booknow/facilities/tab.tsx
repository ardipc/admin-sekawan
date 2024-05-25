"use client";
import { useState } from "react";
import Venue from "./venue";
import AddVenue from "./addvenue";
import Form from "./form";

export default function TabFacilities() {
  const [activeTab, setActiveTab] = useState(0);
  const [detail, setDetail] = useState<any>(null);

  return (
    <>
        {activeTab === 0 && <Venue setActive={setActiveTab} setDetail={setDetail} />}
        {activeTab === 1 && <AddVenue setActive={setActiveTab} item={detail} />}
        {activeTab === 2 && <Form detail={detail} setDetail={setDetail} setActive={setActiveTab} />}
      {/* {activeTab === 2 && <News />} */}
      {/* {activeTab === 3 && <Kontak />} */}
      {/* {activeTab === 5 && <ListAcc />} */}
    </>
  )
}
