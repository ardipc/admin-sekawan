"use client";
import { useState } from "react";
import PreList from "./pre/list";
import PreDetail from "./pre/detail";

export default function EOTab() {
  const [activeTab, setActiveTab] = useState(0);
  
  const [detail, setDetail] = useState<any>();

  return (
    <>
      {activeTab === 0 && <PreList setActive={setActiveTab} setDetail={setDetail} />}
      {activeTab === 1 && <PreDetail detail={detail} setActive={setActiveTab} />}
    </>
  )
}
