"use client";

import { useEffect, useState } from "react";
import DatePick from "../../datepick";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";

export default function EOTicket(){

    const [isLoad, setIsLoad] = useState(false);
    const [lists, setLists] = useState<any[]>();

    useEffect(() => {
        fetchLists();
    }, []);

    const supa = createClientComponentClient();

    const fetchLists = async () => {
        setIsLoad(true);
        const {data,error} = await supa.from("events_packages")
            .select("*, events(*)")
            .order('id', { ascending: false });

        if(!error) setLists(data);
        setIsLoad(false);
    }

    return(
        <>
            <div className="content p-6">
                <div className="flex gap-2 items-center">
                    <img src="/icons/users.svg" alt="icon" />
                    <p className="text-3xl font-bold">List Ticket</p>
                </div>
                <div className="flex justify-between my-6">
                    <div className="flex gap-2 items-center">
                        <p className="text-sm">Show</p>
                        <select className="select select-bordered select-sm max-w-xs">
                            <option>5</option>
                            <option>10</option>
                        </select>
                        <p className="text-sm">Entries</p>
                    </div>
                    <div className="flex gap-4">
                        <DatePick />
                        <select className="select select-bordered select-sm max-w-xs">
                            <option disabled selected>All</option>
                            <option>Active</option>
                            <option>Deactive</option>
                        </select>
                        <input type="text" placeholder="Search..." className="input input-bordered input-sm max-w-xs" />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="py-4 px-6 bg-primary/10 border-primary border-2">
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-sm" />
                                    </label>
                                </th>
                                <th className="text-primary font-bold text-sm w-10">ID</th>
                                <th className="text-primary font-bold text-sm">Nama Event</th>
                                <th className="text-primary font-bold text-sm">Tanggal Kegiatan</th>
                                <th className="text-primary font-bold text-sm">Paket</th>
                                <th className="text-primary font-bold text-sm">Hasil Penjualan</th>
                                <th className="text-primary font-bold text-sm">Tiket Terjual</th>
                                <th className="text-primary font-bold text-sm">Sisa Tiket</th>
                                <th className="text-primary font-bold text-sm">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoad ?
                                    <tr>
                                        <td colSpan={8} className="text-center">
                                            <span className="loading loading-dots loading-md"></span>
                                        </td>
                                    </tr>
                                    :
                                    lists && lists.map((item: any, index: any) => (
                                        <tr key={`sdf-${index}`}>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-sm" />
                                                </label>
                                            </th>
                                            <td>{index + 1}</td>
                                            <td>
                                                <div className="text-sm cursor-pointer text-primary">
                                                    {item.events.name}
                                                </div>
                                            </td>
                                            <td>{moment(item.events.start_date).format('DD MMMM YYYY')}</td>
                                            <td>{item.name}</td>
                                            <td>{0}</td>
                                            <td>{0}</td>
                                            <td>{item.total_ticket}</td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button type="button" className="btn btn-sm btn-primary rounded-none">
                                                        <p className="text-sm font-bold text-white">Lihat</p>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm">Menampilkan 1 sampai 10 dari 25 entri</p>
                    <div className="join flex">
                        <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">Sebelumnya</button>
                        <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">1</button>
                        <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">2</button>
                        <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">3</button>
                        <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">Berikutnya</button>
                    </div>
                </div>

            </div>
        </>
    )
}