"use client"

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionManagerButton({ approval, requestId, email}: {approval: any; requestId: number, email: string}) {
  const supa = createClientComponentClient<Database>();

  const [comment, setComment] = useState<string>("");
  const router = useRouter();

  const isApproved = async (value: boolean) => {
    let payload = {
      deskripsi: comment,
      approved: value
    };
    const req = await supa.from("sekawan_request_approvals").update(payload).eq('email', email).eq('request_id', requestId);
    console.log("data", req)
    if (req) {
      // 1. update request
      await supa.from("sekawan_request").update({ status: "approved" }).eq('id', requestId);

      // 2. insert log
      await supa.from("sekawan_request_log").insert({
        actor: email,
        deskripsi: `${email} approved this request`,
        request_id: requestId,
        tipe: 'approval',
      });

      // 3. update kendaraan to used
      await supa.from("sekawan_kendaraan").update({status: 'active'}).eq('id', approval.sekawan_request.kendaraan_id);

      // 4. update kendaraan log
      await supa.from("sekawan_kendaraan_log").insert({
        actor: email,
        deskripsi: `${email} change status vehicle #${approval.sekawan_request.kendaraan_id} from idle to used`,
        kendaraan_id: approval.sekawan_request.kendaraan_id,
        tipe: 'approval'
      });

      router.push('/manager/request')
    }
  }

  return (
    <>
      {
        approval.approved === null ? 
        <>
          <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Comment" className="w-full px-5 py-3 my-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
          <div className="action flex gap-3">
            <button onClick={() => isApproved(true)} className="btn btn-success">Approved</button>
            <button onClick={() => isApproved(false)} className="btn btn-primary">Reject</button>
          </div>
        </>
        :
        <>
          <button className={`btn ${approval.approved ? 'btn-success' : 'btn-primary'}`}>{approval.approved ? "Approved" : "Rejected"}</button>
          <textarea placeholder="Comment" value={approval.deskripsi} className="bg-slate-100 w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
        </>
      }
    </>
  )
}