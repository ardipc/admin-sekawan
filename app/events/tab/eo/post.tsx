"use client";
import { useState } from "react";
import PostList from "./create/list";
import PostDetail from "./create/detail";

export default function EOTab() {
  const [activeTab, setActiveTab] = useState(0);
  
  const [detail, setDetail] = useState<any>();

  return (
    <>
      {activeTab === 0 && <PostList setActive={setActiveTab} setDetail={setDetail} />}
      {activeTab === 1 && <PostDetail detail={detail} setActive={setActiveTab} />}
    </>
  )
}
