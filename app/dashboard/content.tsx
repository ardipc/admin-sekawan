"use client"

import { useEffect, useState } from "react";
import Tab from "./tab/tab";
import {Line} from 'react-chartjs-2';
import { supadmin } from "@/libs/supadmin";

export default function Content() {
  const supa = supadmin();

  const [isLoad, setIsLoad] = useState(false);
  const [stats, setStats] = useState<any>({
    news: 0,
    tiket: 0,
    pre: 0,
    event: 0
  });

  const fetchStats = async () => {
      setIsLoad(true);
      const pre = await supa.from("sekawan_employees")
        .select()
        .order('id', { ascending: false });
      
      const create = await supa.from("sekawan_kendaraan")
        .select()
        .order('id', { ascending: false });

      const tiket = await supa.from("sekawan_request")
        .select()
        .order('id', { ascending: false });
      
      const news = await supa.from("sekawan_request_approvals")
        .select()
        .order('id', { ascending: false });
      
      setStats({
        news: news.data?.length,
        tiket: tiket.data?.length,
        pre: pre.data?.length,
        event: create.data?.length
      });

      setIsLoad(false);
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <div className="bg-white p-6">
        <div className="flex gap-6">
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newsicon.svg" alt="icon" />
              <p className="font-bold text-white">Request</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.news
                }
              </p>
              <p className="font-medium">Approval</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/ticketwhite.svg" alt="icon" />
              <p className="font-bold text-white">Request</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.tiket
                }
              </p>
              <p className="font-medium">Ticket</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">Employees</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.pre
                }
              </p>
              <p className="font-medium">Employees</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">Vehicles</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.event
                }
              </p>
              <p className="font-medium">Vehicles</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-12">
          <div className="flex items-center gap-2">
            <img src="/icons/total-pasien.svg" alt="icon" />
            <p className="text-3xl font-bold">Log Activities</p>
          </div>
          <select className="select select-bordered select-sm max-w-xs">
              <option disabled selected>Filter</option>
              <option>Today</option>
              <option>Las 7 Days</option>
              <option>Las 1 Month</option>
              <option>Las 1 Year</option>
          </select>
        </div>
        <Tab />
      </div>
    </>
  )
}