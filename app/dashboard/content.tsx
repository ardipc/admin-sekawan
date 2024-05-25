"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useState } from "react";
import Tab from "./tab/tab";
import {Line} from 'react-chartjs-2';
import { supadmin } from "@/libs/supadmin";

const graph = {
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  datasets: [{
    data: [182, 300, 208, 316, 114, 320, 408, 420, 389],
    borderWidth: 1
  }]
}

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
      const pre = await supa.from("events")
        .select()
        .eq('content', '0')
        .eq('tipe', 'pre')
        .order('id', { ascending: false });
      
      const create = await supa.from("events")
        .select()
        .eq('content', '0')
        .eq('tipe', 'create')
        .order('id', { ascending: false });

      const tiket = await supa.from("bookings_user")
        .select()
        .order('id', { ascending: false });
      
      const news = await supa.from("news")
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
              <p className="font-bold text-white">News</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.news
                }
              </p>
              <p className="font-medium">News Terunggah</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/ticketwhite.svg" alt="icon" />
              <p className="font-bold text-white">Ticket</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.tiket
                }
              </p>
              <p className="font-medium">Tiket Terjual</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">Proposal</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.pre
                }
              </p>
              <p className="font-medium">Proposal Event</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">Post Event</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.event
                }
              </p>
              <p className="font-medium">Post Event</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-12">
          <div className="flex items-center gap-2">
            <img src="/icons/total-pasien.svg" alt="icon" />
            <p className="text-3xl font-bold">Pengunjung Website</p>
          </div>
          <select className="select select-bordered select-sm max-w-xs">
              <option disabled selected>Filter</option>
              <option>Today</option>
              <option>Las 7 Days</option>
              <option>Las 1 Month</option>
              <option>Las 1 Year</option>
          </select>
        </div>
        <div className="chart">
        {/* <Line
          data={graph}
        /> */}
        </div>
        <Tab />
      </div>
    </>
  )
}