import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import { cookies } from "next/headers"; 
import Link from "next/link";
import { redirect } from "next/navigation";
import Tab from "./tab";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) {
    redirect(`/signin`);
  }

  const { data } = await supabase.from('sekawan_kendaraan').select('*, sekawan_kendaraan_bbm(*), sekawan_kendaraan_log(*), sekawan_kendaraan_service(*), sekawan_kendaraan_pemakaian(*)').eq('id', params.id).single();
  if (data === null) {
    redirect('/vehicles');
  }

  return (
    <main className="flex-1 overflow-y-auto py-8 px-6 bg-red-100">
      <div className="bg-white">
        <div className="content p-6">
          <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                  <Link href={`/vehicles`}><img src="/icons/back.svg" alt="icon" /></Link>
                  <p className="text-3xl font-bold">Vehicle #{data.plat}</p>
              </div>
          </div>

          <div className="mt-6 mb-3">
            <h3 className="font-bold text-xl mb-3">Information</h3>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Plat</label>
              <input readOnly className="input input-bordered w-full bg-slate-100" value={data?.plat || ''} />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Owner</label>
              {/** @ts-ignore */}
              <input readOnly className="input input-bordered w-full bg-slate-100" value={data?.kepemilikan || ''} />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Type</label>
              {/** @ts-ignore */}
              <input readOnly className="input input-bordered w-full bg-slate-100" value={data?.angkutan || ''} />
            </div>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Status</label>
              <input readOnly className="input input-bordered w-full bg-slate-100" value={ data.status === 'active' ? 'Used' : 'Idle' } />
            </div>
          </div>

          <hr className="my-6" />
          <h3 className="font-bold text-xl mb-3">History Activities</h3>
          <Tab vehicle={data.id} />

        </div>
      </div>
    </main>
  )
}