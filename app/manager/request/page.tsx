import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  const { data } = await supabase.from('sekawan_request_approvals').select('*, sekawan_request(*, sekawan_kendaraan(*))').eq('email',user?.email || '');
  console.log(data);

  return (
    <main className="flex-1 overflow-y-auto py-8 px-6 bg-red-100">
      <div className="bg-white">
        <div className="content p-6">
          <div className="flex justify-between mb-6">
            <div className="flex gap-2 items-center">
                <p className="text-3xl font-bold">Request Need Your Approval</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {
              data && data.map((item: any, index: number) => (
                <div key={index} className="card w-full bg-base-100 shadow-xl border">
                  <div className="card-body">
                    <h2 className="card-title">Request #{item.sekawan_request.id}</h2>
                    <p>Driver : <b>{item.sekawan_request.driver}</b></p>
                    <p>Kendaraan : <b>{item.sekawan_request.sekawan_kendaraan.plat}</b></p>
                    <p>Status : <b className={`border rounded-xl ${item.sekawan_request.status === 'approved' ? 'bg-success' : 'bg-warning'} px-2 py-1`}>{item.sekawan_request.status}</b></p>
                    <p>{item.sekawan_request.deskripsi}</p>
                    <div className="card-actions justify-end">
                      <Link href={`/manager/request/${item.id}`} className="btn btn-primary">More</Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </main>
  )
}