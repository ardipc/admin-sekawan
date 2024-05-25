import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"; 
import Content from "./content";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) {
    redirect(`/signin`);
  }
  return (
    <main className="flex-1 overflow-y-auto py-8 px-6 bg-red-100">
      <Content user={user} />
    </main>
  )
}