"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import { useEffect, useState } from "react";

export default function News({ setActive, setDetail }: { setActive: any; setDetail: Function }){
    const [isLoad, setIsLoad] = useState(false);
    const banner = [
        {judul: 'Gerindra DKI Agrees to JIS Special Committee Formation Proposal: As Long as Its Not Playful', tanggal: 'Senin, 16 Jan 2023 11:45 AM'},
        {judul: 'Anies Baswedan Refuses to Intervene in JIS Renovation Polemic', tanggal: 'Senin, 16 Jan 2023 11:45 AM'},
        {judul: 'Buro Happold Gives Clarification: JIS Construction Did Not Follow Our Guidelines', tanggal: 'Senin, 16 Jan 2023 11:45 AM'},
    ]

    useEffect(() => {
        fetchData();
    }, []);

    const supabase = createClientComponentClient();

    const [news, setNews] = useState<any[]>([]);
    const fetchData = async () => {
        setIsLoad(true);
        const {data} = await supabase.from('news').select(`*, categories(*)`).order('id', { ascending: false });
        if(data){
            setNews(data);
        }
        setIsLoad(false);
    }

    const togglePublish = async (id: number, value: boolean) => {
        await supabase.from('news').update({ is_published: !value }).eq('id', id);
        fetchData();
    }

    const actionDelete = async (id: number) => {
        await supabase.from('news').delete().eq('id', id);
        fetchData();
        closeConfirmation();
    }

    const [newsId, setNewsId] = useState(0);
    const openConfirmation = (id: number) => {
        setNewsId(id);
        // @ts-ignore
        window.modal_confirmation.showModal();
    }

    const closeConfirmation = () => {
        setNewsId(0);
        // @ts-ignore
        window.modal_confirmation.close();
    }

    const viewDetail = (e: any, item: any) => {
        e.preventDefault();
        setDetail(item);
        setActive(2);
    }

    return(
        <>
            <div className="content p-6">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <img src="/icons/document.svg" alt="icon" />
                        <p className="text-3xl font-bold">List News</p>
                    </div>
                    <button onClick={() => setActive(1)} className="btn btn-primary rounded-none text-white text-xs font-bold"><img src="/icons/tambah-wt.svg" alt="tambah" />Tambah Berita</button>
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
                    <thead className="py-4 px-6 bg-primary/10 border-primary border-2">
                        <tr>
                        <th>
                            <label>
                            <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-sm" />
                            </label>
                        </th>
                        <th className="text-primary font-bold text-sm w-10">ID</th>
                        <th className="text-primary font-bold text-sm">Judul Berita</th>
                        <th className="text-primary font-bold text-sm">Tanggal Unggah</th>
                        <th className="text-primary font-bold text-sm">Views</th>
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
                                news.map((item, index: any) => (
                                    <tr key={`sdf-${index}`}>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-sm" />
                                            </label>
                                        </th>
                                        <td>{item.id}</td>
                                        <td>
                                            <a className="cursor-pointer text-primary" onClick={e => viewDetail(e, item)}>{item.title}</a>
                                        </td>
                                        <td>{moment(item.created_at).format('DD MMM YYYY HH:mm:ss')}</td>
                                        <td>{item.is_published ? <span className="badge badge-success text-white">Published</span> : <span className="badge badge-neutral text-white">Draft</span>}</td>
                                        <td>
                                            <div className="flex gap-2">
                                                {
                                                    item.is_published ?
                                                        <button onClick={() => togglePublish(item.id, item.is_published)} type="button" className="btn btn-xs btn-neutral rounded-none">
                                                            <p className="text-sm font-bold text-white">Unpublish</p>
                                                        </button>
                                                        :
                                                        <button onClick={() => togglePublish(item.id, item.is_published)} type="button" className="btn btn-xs btn-success rounded-none">
                                                            <p className="text-sm font-bold text-white">Publish</p>
                                                        </button>
                                                }
                                                <button onClick={() => {
                                                        setDetail(item);
                                                        setActive(3);
                                                    }} type="button" className="btn btn-xs btn-primary rounded-none">
                                                    <p className="text-sm font-bold text-white">Edit</p>
                                                </button>
                                                <button onClick={() => openConfirmation(item.id)} type="button" className="btn btn-xs btn-primary btn-outline rounded-none hover:text-white">
                                                    <p className="text-sm font-bold text-primary hover:text-white">Hapus</p>
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
                <dialog id="modal_confirmation" className="modal">
                    <section className="modal-box">
                        <h3 className="font-bold text-xl text-center">Hapus Data</h3>
                        <button onClick={() => closeConfirmation()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        <section className="my-6">
                            <p className="text-center text-xs font-medium">Apakah anda yakin menghapus berita <span className="font-bold">Ini?</span><br />Anda tidak dapat mengembalikan data yang sudah dihapus.</p>
                        </section>
                        <div className="modal-action flex justify-center my-4 gap-4">
                            <button onClick={() => closeConfirmation()} className="btn btn-outline btn-primary text-white rounded-none">Batal</button>
                            <button onClick={() => actionDelete(newsId)} className="btn btn-primary text-white rounded-none">Hapus</button>
                        </div>
                    </section>
                </dialog>
            </div>
        </>
    )
}
