"use client"

import { useEffect, useState } from "react";
import { supadmin } from "@/libs/supadmin";

export default function Content() {
  const supa = supadmin();

  const [isLoad, setIsLoad] = useState(false);
  const [stats, setStats] = useState<any>({
    req: {
      all: 0,
      awaiting: 0,
      approved: 0,
      rejected: 0,
    },
    vehicles: {
      company: 0,
      rent: 0,
      goods: 0,
      people: 0,
    },
    users: {
      all: 0,
      admin: 0,
      driver: 0,
      manager: 0,
    },
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
        req: {
          all: tiket.data?.filter(r => r.status === 'requested').length,
          awaiting: tiket.data?.filter(r => r.status === 'awaiting').length,
          approved: tiket.data?.filter(r => r.status === 'approved').length,
          rejected: tiket.data?.filter(r => r.status === 'rejected').length,
        },
        vehicles: {
          company: create.data?.filter(r => r.kepemilikan === 'perusahaan').length,
          rent: create.data?.filter(r => r.kepemilikan === 'sewa').length,
          goods: create.data?.filter(r => r.angkutan === 'barang').length,
          people: create.data?.filter(r => r.angkutan === 'orang').length,
        },
        users: {
          all: pre.data?.length,
          admin: pre.data?.filter(r => r.role === 'admin').length,
          driver: pre.data?.filter(r => r.role === 'driver').length,
          manager: pre.data?.filter(r => r.role === 'manager').length,
        },
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
        <div className="flex gap-6 mb-6">
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newsicon.svg" alt="icon" />
              <p className="font-bold text-white">Requested</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.req.all
                }
              </p>
              <p className="font-medium">Request</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/ticketwhite.svg" alt="icon" />
              <p className="font-bold text-white">Awaiting</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.req.awaiting
                }
              </p>
              <p className="font-medium">Request</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">Approved</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.req.approved
                }
              </p>
              <p className="font-medium">Request</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">Rejected</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.req.rejected
                }
              </p>
              <p className="font-medium">Request</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6 mb-6">
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newsicon.svg" alt="icon" />
              <p className="font-bold text-white">Vehicle Company</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.vehicles.company
                }
              </p>
              <p className="font-medium">Vehicle</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/ticketwhite.svg" alt="icon" />
              <p className="font-bold text-white">Vehicle Rent</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.vehicles.rent
                }
              </p>
              <p className="font-medium">Vehicle</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">Vehicle Goods</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.vehicles.goods
                }
              </p>
              <p className="font-medium">Vehicles</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">Vehicle People</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.vehicles.people
                }
              </p>
              <p className="font-medium">Vehicle</p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newsicon.svg" alt="icon" />
              <p className="font-bold text-white">All User</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.users.all
                }
              </p>
              <p className="font-medium">User</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/ticketwhite.svg" alt="icon" />
              <p className="font-bold text-white">User Admin</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.users.admin
                }
              </p>
              <p className="font-medium">User</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">User Driver</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.users.driver
                }
              </p>
              <p className="font-medium">User</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="bg-primary py-2.5 px-5 flex items-center gap-2.5">
              <img src="icons/newswhite.svg" alt="icon" />
              <p className="font-bold text-white">User Manager</p>
            </div>
            <div className="shadow-lg items-center py-5 px-5 flex gap-2.5">
              <p className="font-bold text-5xl">
                {
                  isLoad ? <span className="loading loading-dots loading-md"></span> : stats.users.manager
                }
              </p>
              <p className="font-medium">User</p>
            </div>
          </div>
        </div>

        {/* <div className="flex justify-between mt-12">
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
        </div> */}
      </div>
    </>
  )
}