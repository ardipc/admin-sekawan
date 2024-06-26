import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Beranda from "./beranda";

export default async function Page(){
  const supabase = createServerComponentClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if(!user) {
    redirect(`/signin`);
  }

  if (user.user_metadata.role === 'driver') {
    redirect('/driver');
  }

  if (user.user_metadata.role === 'manager') {
    redirect('/manager');
  }

  return (
    <Beranda user={user} />
  )
}
