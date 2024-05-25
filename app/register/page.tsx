import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminForm from "./Admin";

export default async function Page() {
  const supabase = createServerComponentClient({ cookies });

  const { data: { user }} = await supabase.auth.getUser();

  if(user) {
    redirect(`/profile`);
  }

  return (
    <section className="bg-white dark:bg-gray-900 w-full">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-full" style={{backgroundImage: 'url("/images/sign-in-jis.png")'}}>
        </div>
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-1/2">
          <div className="w-full">
            <h5 className="text-sm">Please Register</h5>
            <h1 className="text-4xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Create Account
            </h1>

            <AdminForm />
          </div>
        </div>
      </div>
    </section>

  )
}