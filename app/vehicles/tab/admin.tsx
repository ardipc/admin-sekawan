"use client";
import React, { useEffect, useState } from "react";
import DatePick from "../datepick";
import { User } from "@supabase/supabase-js";
import { JsonView } from 'react-json-view-lite';
import { useVehicles } from "@/libs/hooks/useVehicles";

export default function Admin(){

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const [isLoad, setIsLoad] = useState(false);
    const [users, setUsers] = useState<any[]>();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setIsLoad(true);
        const { data, error } = await useVehicles({ angkutan: "orang" });
        if(!error) setUsers(data);
        setIsLoad(false);
    }

    const handleStatusFilterChange = (e: any) => {
        setStatusFilter(e.target.value);
    };

    const showInfoUser = (user: User) => {
        setInfoUser(user);
        // @ts-ignore
        window.modal_info_user.showModal();
    }

    const closeInfoUser = () => {
        setInfoUser(undefined);
        // @ts-ignore
        window.modal_info_user.close();
    }

    const [infoUser, setInfoUser] = useState<User>();

    return(
        <>
            <div className="content p-6">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <img src="/icons/users.svg" alt="icon" />
                        <p className="text-3xl font-bold">Vehicles</p>
                    </div>
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
                        <select className="select select-bordered select-sm max-w-xs" onChange={handleStatusFilterChange} value={statusFilter}>
                            <option value={"All"}>All</option>
                            <option value={"1"}>Active</option>
                            <option value={"0"}>Deactive</option>
                        </select>
                        <input type="text" placeholder="Search..." className="input input-bordered input-sm max-w-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
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
                                <th className="text-primary font-bold text-sm">Plat</th>
                                <th className="text-primary font-bold text-sm">Owner</th>
                                <th className="text-primary font-bold text-sm">Type</th>
                                <th className="text-primary font-bold text-sm">Status</th>
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
                                    users && users.map((item: any, index: any) => (
                                        <tr key={`sdf-${index}`}>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-sm" />
                                                </label>
                                            </th>
                                            <td>{item.id}</td>
                                            <td>
                                                <div onClick={() => showInfoUser(item)} className="text-sm cursor-pointer text-primary">
                                                    {item.plat}
                                                </div>
                                            </td>
                                            <td>{item.kepemilikan}</td>
                                            <td>{item.angkutan}</td>
                                            <td>
                                                {item.status === "active" ? (
                                                    <div className="bg-success/10 p-2 border-2 border-success text-xs text-center text-primary">Active</div>
                                                ) : (
                                                    <div className="bg-primary/10 p-2 border-2 border-primary text-xs text-center text-primary">Passive</div>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    <button type="button" className="btn btn-sm btn-primary rounded-none">
                                                        <img src="/icons/edit.svg" alt="icon" />
                                                        <p className="text-sm font-bold text-white">Edit</p>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>

                    <dialog id="modal_info_user" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-xl text-center mb-6">Detail User</h3>
                            <JsonView data={infoUser || {}} />
                            <button className="btn btn-primary mt-6" type="button" onClick={() => closeInfoUser()}>Close</button>
                        </form>
                    </dialog>

                    <dialog id="modal_delete_akun" className="modal">
                        <form method="dialog" className="modal-box">
                            <h3 className="font-bold text-xl text-center">Hapus Data</h3>
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            <section className="mt-12">
                                <p className="text-center text-xs font-medium">Apakah anda yakin menghapus data <span className="font-bold">Akun?</span><br />Anda tidak dapat mengembalikan data yang sudah dihapus.</p>
                            </section>
                            <div className="modal-action flex justify-center my-4 gap-4">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-outline btn-primary text-white rounded-none">Batal</button>
                                <button className="btn btn-primary text-white rounded-none">Hapus</button>
                            </div>
                        </form>
                    </dialog>

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