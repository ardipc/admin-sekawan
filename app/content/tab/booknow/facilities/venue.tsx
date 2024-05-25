"use client";

import { supadmin } from "@/libs/supadmin";
import { deleteFileOnStorage } from "@/libs/uploader";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Venue({ setActive, setDetail }: { setActive: any; setDetail: any; }){
    const supabase = supadmin();

    const [list, setList] = useState<any[]>();

    const fetchData = async () => {
        setIsLoad(true);
        const {data, error} = await supabase.from("facilities").select(`*, facilities_packages(*)`).eq('content', 0).eq('tipe', 'facility').order('id', { ascending: false});
        if(!error) setList(data);
        setIsLoad(false);
    }

    const hapusData = async (id: any, cover: string) => {
        await supabase.from('facilities_packages').delete().eq('facility_id', id);
        await supabase.from('facilities').delete().eq('id', id);
        await deleteFileOnStorage(supabase, cover);
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [isLoad, setIsLoad] = useState(false);
    
    return(
        <>
            <div className="content p-6">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <img src="/icons/document.svg" alt="icon" />
                    <p className="text-3xl font-bold">List Facilities</p>
                </div>
                <button onClick={()=> {setActive(1); setDetail(null);}} className="btn btn-primary rounded-none text-white text-xs font-bold"><img src="/icons/tambah-wt.svg" alt="tambah" />Tambah Facility</button>
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
                <input type="text" placeholder="Cari..." className="input input-bordered input-sm" />
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
                    <th className="text-primary font-bold text-sm">Gambar</th>
                    <th className="text-primary font-bold text-sm">Nama Facilities</th>
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
                            list && list.map((item, index: any) => (
                                <tr key={`sdf-${index}`}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-sm" />
                                        </label>
                                    </th>
                                    <td>{index + 1}</td>
                                    <td><Image width={80} height={80} src={item.cover} alt="Gambar" /></td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="flex gap-2">
                                            <button onClick={() => { setDetail(item); setActive(1); }} type="button" className="btn btn-sm btn-primary rounded-none">
                                                <img src="/icons/edit.svg" alt="icon" />
                                                <p className="text-sm font-bold text-white">Edit</p>
                                            </button>
                                            <button onClick={() => hapusData(item.id, item.cover)} type="button" className="btn btn-sm btn-primary btn-outline rounded-none">
                                                <img src="/icons/hapus-active.svg" alt="icon" />
                                                <p className="text-sm font-bold text-primary">Hapus</p>
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
        </>
    )
}