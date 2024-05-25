"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function ButtonLogout() {
  const supabase = createClientComponentClient();
  const router = useRouter()

  const klikLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  }
  return (
    <a onClick={() => klikLogout()}><img src="/icons/logout.png" alt="Gambar" className="me-3" />Logout</a>
  )
}