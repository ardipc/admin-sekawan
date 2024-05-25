"use client";
import { useState } from "react";
import News from "./listnews";
import AddNews from "./addnews";
import DetailNews from "./detail";
import EditNews from "./edit";

export default function Tabnews() {
  
  const [activeTab, setActiveTab] = useState(0);
  const [detail, setDetail] = useState<any>(null);

  return (
    <>
      {activeTab === 0 && <News setActive={setActiveTab} setDetail={setDetail}  />}
      {activeTab === 1 && <AddNews setActive={setActiveTab} />}
      {activeTab === 2 && <DetailNews detail={detail} setActive={setActiveTab} setDetail={setDetail} />}
      {activeTab === 3 && <EditNews detail={detail} setActive={setActiveTab} />}
    </>
  )
}
