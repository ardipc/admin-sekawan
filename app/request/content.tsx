"use client"
import { User } from "@supabase/supabase-js";
import Tab from "./tab/tab";

export default function Content({ user }: { user: User }) {
  return (
    <>
      <div className="bg-white">
        <Tab user={user} />
      </div>
    </>
  )
}