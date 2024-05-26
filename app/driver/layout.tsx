import Header from "@/components/Header"
import Sidebar from "@/components/SidebarManager"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers"; 
import NavbarDriver from "@/components/NavbarDriver";
import FooterDriver from "@/components/FooterDriver";

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if(!user) {
    redirect(`/signin`);
  }

  return(
    <>
      <NavbarDriver user={user} />
      {children}
      <FooterDriver />
    </>
  )
}