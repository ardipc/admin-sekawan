import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  const { data: employee } = await supabase.from('sekawan_employees').select('*').eq(`email`, user?.email || '').single();

  return (
    <main className="flex-1 overflow-y-auto py-8 px-6 bg-red-100">
      <div className="bg-white">
        <div className="content p-6">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <p className="text-3xl font-bold">Hello {employee?.fullname}</p>
            </div>
          </div>

          <div className="mt-6 mb-3">
            <h3 className="font-bold text-xl mb-3">Information</h3>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Fullname</label>
              <input readOnly className="input input-bordered w-full bg-slate-100" value={employee?.fullname || ''} />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Email</label>
              {/** @ts-ignore */}
              <input readOnly className="input input-bordered w-full bg-slate-100" value={employee?.email || ''} />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Role</label>
              <input readOnly className="input input-bordered w-full bg-slate-100" value={employee?.role || ''} />
            </div>
            {
              employee?.manager_email &&
              <div className="flex items-center mb-4">
                <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Manager</label>
                {/** @ts-ignore */}
                <input readOnly className="input input-bordered w-full bg-slate-100" value={employee?.manager_email || ''} />
              </div>
            }
          </div>
        </div>
      </div>
    </main>
  )
}