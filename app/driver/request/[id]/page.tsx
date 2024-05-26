import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import { cookies } from "next/headers"; 
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if(!user) {
    redirect(`/signin`);
  }

  const { data } = await supabase.from('sekawan_request').select('*, sekawan_kendaraan(*), sekawan_employees(*), sekawan_request_approvals(*), sekawan_request_log(*)').eq('id', params.id).single();
  if (data === null) {
    redirect('/request');
  }

  const { data: approvals } = await supabase.from('sekawan_request_approvals').select('*').eq('request_id', params.id || 0).order('id', { ascending: true });
  const approvedLength = data.sekawan_request_approvals.filter(r => r.approved === true).length;

  return (
    <main className="flex-1 overflow-y-auto py-8 px-6 bg-red-100">
      <div className="bg-white">
        <div className="content p-6">
          <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                  <Link href={`/request`}><img src="/icons/back.svg" alt="icon" /></Link>
                  <p className="text-3xl font-bold">Request #{params.id}</p>
              </div>
          </div>

          <div className="mt-6 mb-3">
            <h3 className="font-bold text-xl mb-3">Information</h3>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Vehicle</label>
              <input readOnly className="input input-bordered w-full bg-slate-100" value={data?.sekawan_kendaraan?.plat || ''} />
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Driver</label>
              {/** @ts-ignore */}
              <input readOnly className="input input-bordered w-full bg-slate-100" value={data?.sekawan_employees?.fullname || ''} />
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Description</label>
              <textarea readOnly value={data?.deskripsi || ''} placeholder="Description" className="block bg-slate-100 w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
          </div>

          <hr className="my-6" />
          <h3 className="font-bold text-xl mb-3">Approval</h3>
          {
            data?.sekawan_request_approvals && data.sekawan_request_approvals.map((item: any, index: number) => (
              <div key={index} className="flex items-center mb-4">
                <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Level {index+1}</label>
                <input readOnly className="input input-bordered w-full bg-slate-100" value={item.email || ''} />
              </div>
            ))
          }

          <hr className="my-6" />
          <h3 className="font-bold text-xl mb-3">Timeline</h3>
          <div className="flex justify-center">
            <ul className="steps">
              <li className="step step-success px-2">Requested</li>
              {
                approvals && approvals.map((item: any, index: number) => (
                  <li key={index} className={`step ${item.approved ? 'step-success' : ''} px-2`}>{item.email}</li>
                ))
              }
              <li className={`step ${data.sekawan_request_approvals.length === approvedLength ? 'step-success' : ''}`}>{data.sekawan_request_approvals.length === approvedLength ? 'Approved' : '-'}</li>
            </ul>
          </div>

          <hr className="my-6" />
          <h3 className="font-bold text-xl mb-3">History</h3>
          <div className="w-1/2">
            <ul className="timeline timeline-vertical">
            {
              data?.sekawan_request_log && data.sekawan_request_log.reverse().map((item: any, index: number) => (
                <li key={index}>
                  <hr/>
                  <div className="timeline-start">{moment(item.created_at).format('LLL')}</div>
                  <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                  </div>
                  <div className="timeline-end timeline-box">{item.deskripsi}</div>
                  {
                    index === 0 ? <hr /> : null
                  }
                </li>
              ))
            }
            </ul>
          </div>

        </div>
      </div>
    </main>
  )
}