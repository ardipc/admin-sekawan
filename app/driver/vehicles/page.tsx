import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/signin');
  }

  const { data } = await supabase.from("sekawan_request").select('*, sekawan_kendaraan(*)').eq('driver', user.email || '').eq('status', 'approved').order('id', { ascending: false });

  return (
    <main className="flex-1 overflow-y-auto p-3">
      <div className="bg-white">
        <div className="content">
          
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <p className="text-3xl font-bold">My Vehicles</p>
            </div>
          </div>

          <div className="grid grid-cols-1 my-6 gap-3">
            <>
              {
                data?.length === 0 ? <div className="card w-full border bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">No Vehicles</h2>
                </div>
              </div>
              : null
              }
            </>
            
            {
              data && data.map((item: any, index: number) => (
                <div key={index} className="card w-full border bg-base-100 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">Request ID #{item.id}</h2>
                    <p>{item.deskripsi}</p>
                    <table className="table table-sm">
                      <tr>
                        <td>Plat</td>
                        <td>: <b>{item.sekawan_kendaraan.plat}</b></td>
                      </tr>
                      <tr>
                        <td>Type</td>
                        <td>: <b>Angkutan {item.sekawan_kendaraan.angkutan}</b></td>
                      </tr>
                      <tr>
                        <td>Owner</td>
                        <td>: <b className="uppercase">{item.sekawan_kendaraan.kepemilikan}</b></td>
                      </tr>
                    </table>
                    <div className="card-actions justify-end">
                      <Link href={`/driver/vehicles/${item.id}`} className="btn btn-primary">Detail</Link>
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