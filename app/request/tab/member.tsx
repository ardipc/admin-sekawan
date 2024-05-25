"use client";

import { supadmin } from "@/libs/supadmin";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const skema = z.object({
  driver: z.string().email(),
  deskripsi: z.string(),
  kendaraan_id: z.preprocess(v => Number(v), z.number()),
  manager: z.string().email(),
  upper: z.preprocess(v => { return v === null ? "" : String(v)}, z.string()).optional(),
})

type Skema = z.infer<typeof skema>;

export default function Admin({ user }: { user: User; }) {

  const supa = supadmin();

  const { register, reset, setValue, handleSubmit, formState: { errors } } = useForm<Skema>({
    resolver: zodResolver(skema),
    defaultValues: {
      driver: '',
      deskripsi: '',
      kendaraan_id: 0,
      manager: '',
      upper: '',
    }
  });

  const [vehicles, setVehicles] = useState<any[]|null>([]);
  const [drivers, setDrivers] = useState<any[]|null>([]);
  const [managers, setManagers] = useState<any[]|null>([]);

  const [upper, setUpper] = useState<string>("");
  const [message, setMessage] = useState<string>("NONE");

  const fetchData = async () => {
    const { data: ve } = await supa.from("sekawan_kendaraan").select().eq('status', 'passive');
    setVehicles(ve);
    const { data: dr } = await supa.from("sekawan_employees").select().eq('status', 'active').eq('role', 'driver');
    setDrivers(dr);
    const { data: ma } = await supa.from("sekawan_employees").select().eq('status', 'active').eq('role', 'manager');
    setManagers(ma);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const checkManager = async (value: string) => {
    const filtered = managers?.filter((item: any) => item.email === value);
    const upperManager = filtered?.length ? filtered[0] : null;
    if(upperManager) {
      setUpper(upperManager.manager_email);
      setValue('upper', upperManager.manager_email);
    } else {
      setUpper("");
      setValue('upper', '');
    }
  }

  const onSubmit: SubmitHandler<Skema> = async (data) => {
    console.log("data", data);
    // 1. insert into request
    const insert = await supa.from('sekawan_request').insert({
      driver: data.driver,
      deskripsi: data.deskripsi,
      kendaraan_id: data.kendaraan_id,
      status: "requested"
    }).select();

    // 2. insert into approval level 1
    const approval = await supa.from('sekawan_request_approvals').insert({
      email: data.manager,
      request_id: insert.data?.length ? insert.data[0].id : 0,
    })

    // 3. insert into approval level 2
    if (data.upper && data.upper.length > 0) {
      const approval = await supa.from('sekawan_request_approvals').insert({
        email: data.upper,
        request_id: insert.data?.length ? insert.data[0].id : 0,
      })
    }

    // 4. insert into log
    const log = await supa.from('sekawan_request_log').insert({
      actor: user.email,
      request_id: insert.data?.length ? insert.data[0].id : 0,
      tipe: 'request',
      deskripsi: `Requesting vehicle #${data.kendaraan_id} for driver ${data.driver} with the purpose is ${data.deskripsi}`
    })
    
    if(log.status === 201) {
      reset();
      setMessage('SUCCESS');
    }
  }

  return (
    <>
      <div className="content p-6">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <img src="/icons/users.svg" alt="icon" />
            <p className="text-3xl font-bold">Create Request</p>
          </div>
        </div>

        <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-6 mb-3">
            <h3 className="font-bold text-xl mb-3">Information</h3>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Vehicle</label>
              <select {...register('kendaraan_id')} className="select select-bordered w-full">
                <option value="0">Choose</option>
                {
                  vehicles?.map((row: any, index: number) => (
                    <option key={index} value={row.id}>{row.plat} - {row.kepemilikan} - {row.angkutan}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Driver</label>
              <select {...register('driver')} className="select select-bordered w-full">
                <option value="">Choose</option>
                {
                  drivers?.map((row: any, index: number) => (
                    <option key={index} value={row.email}>{row.fullname} - {row.email}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex items-center mb-2">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Description</label>
              <textarea {...register('deskripsi')} placeholder="Description" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>

            <hr className="my-6" />
            <h3 className="font-bold text-xl mb-3">Approval</h3>
            <div className="flex items-center mb-4">
              <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Level 1</label>
              <select {...register('manager')} onChange={e => checkManager(e.target.value)} className="select select-bordered w-full">
                <option value="">Choose</option>
                {
                  managers?.map((row: any, index: number) => (
                    <option key={index} value={row.email}>{row.email}</option>
                  ))
                }
              </select>
            </div>
            {
              upper && upper.length > 0 ?
              <div className="flex items-center">
                <label htmlFor="name" className="inline-block w-40 mr-6 text-right font-bold text-gray-600">Level 2</label>
                <input {...register('upper')} className="input input-bordered w-full bg-slate-100" readOnly />
              </div>
            : null }

          </div>
          <hr />
          
          <div className="flex mt-2">
            <div className="w-36"></div>
            <button className="btn btn-primary" disabled={message === 'SUCCESS'}>{message === 'SUCCESS' ? 'Request Saved' : 'Submit Request'}</button>
          </div>
        </form>
        
      </div>
    </>
  )
}