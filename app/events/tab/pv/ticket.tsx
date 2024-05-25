"use client";

import { useEffect, useState } from "react";
import DatePick from "../../datepick";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import { ComponentBookingStatus, ListBookingStatus } from "@/components/Statuses";
import { supadmin } from "@/libs/supadmin";

export default function PVTicket(){

    const [isLoad, setIsLoad] = useState(false);
    const [lists, setLists] = useState<any[]>();

    useEffect(() => {
        fetchLists();
    }, []);

    const supa = supadmin();

    const fetchLists = async () => {
        setIsLoad(true);
        const {data,error} = await supa.from("bookings")
            .select("*, banks(name, logo, nomor_rekening, account_owner), bookings_provements(id, filename, created_at), events_packages(*, events(*)), bookings_user(name, phone, email)")
            .eq('content', '0')
            .eq('tipe', 'event')
            .order('id', { ascending: false });
      
        if(!error) setLists(data);
        setIsLoad(false);
    }

    const [booking, setBooking] = useState<any>();

    const openModalProovement = async (data: any) => {
        console.log(data)
        setBooking(data);
        // @ts-ignore
        window.modal_provement.showModal();
    }

    const [btnReject, setBtnReject] = useState(false);
    const [feedback, setFeedback] = useState("");

    const closeModalProovement = () => {
        setBooking(null);
        setBtnReject(false);
        setFeedback("");
        // @ts-ignore
        window.modal_provement.close();
    }

    const approvePayment = async () => {
        await supa.from("bookings").update({ status: "Done" }).eq('id', booking.id);
        fetchLists();
        closeModalProovement();
    }

    const rejectPayment = async () => {
        await supa.from("bookings").update({ status: "Purchase Canceled By Admin", feedback }).eq('id', booking.id);
        await supa.from("bookings_provements").delete().eq('booking_id', booking.id);
        fetchLists();
        closeModalProovement();
    }

    const [status, setStatus] = useState('All');
    const findList = async (status: string) => {
        setIsLoad(true);
        if(status === "All") {
            const {data,error} = await supa.from("bookings")
                .select("*, banks(name, logo, nomor_rekening, account_owner), bookings_provements(id, filename, created_at), events_packages(*, events(*)), bookings_user(name, phone, email)")
                .eq('content', '0')
                .eq('tipe', 'event')
                .order('id', { ascending: false });
            if(!error) setLists(data);
        } else {
            const {data,error} = await supa.from("bookings")
                .select("*, banks(name, logo, nomor_rekening, account_owner), bookings_provements(id, filename, created_at), events_packages(*, events(*)), bookings_user(name, phone, email)")
                .eq('content', '0')
                .eq('tipe', 'event')
                .eq('status', status)
                .order('id', { ascending: false });
            if(!error) setLists(data);
        }
        setStatus(status);
        setIsLoad(false);
    }

    return(
        <>
            <div className="content p-6">
                <div className="flex gap-2 items-center">
                    <img src="/icons/users.svg" alt="icon" />
                    <p className="text-3xl font-bold">List Ticket Purchase</p>
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
                        <select value={status} onChange={e => findList(e.target.value)} className="select select-bordered select-sm max-w-xs">
                            {
                                ListBookingStatus.map((item, index) => (
                                    <option key={`in-${index}`} value={item.value}>{item.label}</option>
                                ))
                            }
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
                                <th className="text-primary font-bold text-sm">Quantity</th>
                                <th className="text-primary font-bold text-sm">Jumlah Bayar</th>
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
                                                    {item.events_packages.events.name}
                                                </div>
                                            </td>
                                            <td>{moment(item.events_packages.events.start_date).format('DD MMMM YYYY')}</td>
                                            <td>{item.bookings_user.length}</td>
                                            <td>{item.amount.toLocaleString('id-ID')}</td>
                                            <td>
                                                <ComponentBookingStatus status={item.status} />
                                            </td>
                                            <td>
                                                <div className="flex gap-2">
                                                    {
                                                        ["Purchase Canceled By Admin", "Waiting for Proof of Payment", "Done"].includes(item.status) && 
                                                        <button onClick={() => openModalProovement(item)} type="button" className="btn btn-sm btn-primary rounded-none">
                                                            <p className="text-sm font-bold text-white">Lihat</p>
                                                        </button>
                                                    }
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

                <dialog id="modal_provement" className="modal">
                    <section className="modal-box">
                        <h3 className="font-bold text-3xl text-center mb-6">Bukti Pembayaran</h3>

                        {
                            booking &&
                            <>
                                <div className="mt-6">
                                    <div className="booking-details1 border-2 p-4 mb-3">
                                        <h1 className="text-2xl font-bold text-black">Event</h1>
                                        <div className="columns columns-2 gap-4 mt-4">
                                            <img src={booking.events_packages.events.cover} alt="kursi" />
                                            <p className="text-xl font-bold text-black">{booking.events_packages.events.name}</p>
                                            <h1 className="text-lg mt-2 text-black">{booking.events_packages.name}</h1>
                                        </div>
                                    </div>
                                    <div className="booking-details3 border-2 p-4 mb-3">
                                        <h1 className="text-2xl font-bold text-black">Users</h1>
                                        <div className="gap-4 mt-4">
                                            {
                                                booking.bookings_user.map((item: any, index: number) => (
                                                    <div key={`df-${index}`} className="border p-2 my-2">
                                                        <p className="text-base">Nama</p>
                                                        <p className="text-xl font-bold text-black mb-2">{item.name}</p>
                                                        <p className="text-base">Phone</p>
                                                        <p className="text-xl font-bold text-black mb-2">{item.phone}</p>
                                                        <p className="text-base">Email</p>
                                                        <p className="text-xl font-bold text-black mb-2">{item.email}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="booking-details2 border-2 p-4 mb-3">
                                        <h1 className="text-2xl font-bold text-black">Bank</h1>
                                        <div className="gap-4 mt-4">
                                            <div className="flex mb-4 items-center">
                                                { booking.banks.logo && <img src={booking.banks.logo} className="w-24 me-3" alt="Gambar" /> }
                                                <p className="text-xl font-bold text-black">{booking.banks.name}</p>
                                            </div>
                                            <p className="text-base">Account Owner</p>
                                            <p className="text-xl font-bold text-black mb-2">{booking.banks.account_owner}</p>
                                            <p className="text-base">Nomor Rekening</p>
                                            <p className="text-xl font-bold text-black mb-2">{booking.banks.nomor_rekening}</p>

                                            <p className="text-base">Amount</p>
                                            <h1 className="text-2xl font-bold text-primary mb-5">
                                                IDR &nbsp;
                                                {
                                                    booking.amount.toLocaleString('id-ID')
                                                }
                                            </h1>

                                            {
                                                booking.bookings_provements.map((item: any, index: number) => item.filename && (
                                                    <img key={`gm-${index}`} src={item.filename} alt="Gambar" className="w-full my-2" />
                                                ))
                                            }

                                            {
                                                booking.feedback && <>
                                                    <p className="text-base mt-3">Feedback</p>
                                                    <p className="text-xl font-bold text-black mb-2">{booking.feedback}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col my-3">
                                        {
                                            btnReject ? <>
                                                <p className="text-base">Feedback</p>
                                                <textarea value={feedback} onChange={e => setFeedback(e.target.value)} className="textarea textarea-bordered mb-2"></textarea>
                                                <button onClick={() => rejectPayment()} className="btn btn-error">Submit</button>
                                            </> : null
                                        }
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        {
                                            booking && <>
                                                {
                                                    booking.status === "Waiting for Proof of Payment" && 
                                                    <>
                                                        <button className="btn btn-success" type="button" onClick={() => approvePayment()}>Approve</button>
                                                        <button className="btn btn-error" type="button" onClick={() => setBtnReject(true)}>Reject</button>
                                                    </>
                                                }
                                            </>
                                        }
                                        <button className="btn btn-primary btn-outline" type="button" onClick={() => closeModalProovement()}>Close</button>
                                    </div>
                                </div>
                            </>
                        }

                    </section>
                </dialog>
            </div>
        </>
    )
}