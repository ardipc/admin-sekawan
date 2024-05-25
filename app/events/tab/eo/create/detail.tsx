"use client";

import { ChevronLeftIcon, ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";

export default function PostDetail({ setActive, detail }: { setActive: any; detail: any; }) {

  const [resubmit, setResubmit] = useState(false);
  const reSubmitEvent = async () => {
    setResubmit(true);
    setResubmit(false);
  }

  const supa = createClientComponentClient();

  const clickSetuju = async () => {
    await supa.from('events').update({status: "Approved"}).eq("id", detail.id).select();
    setActive(0);
  }

  const [alasan, setAlasan] = useState("");
  const clickTolak = () => {
    //@ts-ignore
    window.modal_alasan_tolak.showModal();
  }

  const sendAlasan = async () => {
    if(alasan) {
        await supa.from('events').update({status: "Rejected", reason: alasan}).eq("id", detail.id).select();
        tutupModal();
        setActive(0);
    }
  }

  const tutupModal = () => {
    //@ts-ignore
    window.modal_alasan_tolak.close();
    setAlasan("");
  }
  
  return(
    <>
        <div className="content p-6">
            <div className="flex gap-2 items-center mb-4">
                <ChevronLeftIcon onClick={() => setActive(0)} className="cursor-pointer w-6 h-6 me-6" />
                <h1 className="text-2xl me-3 font-bold">Detail Post Event</h1>
                <div className={`p-2 ${detail?.status === "Rejected" ? 'bg-red-50 text-primary' : detail?.status === "Approved" ? 'bg-green-50 text-success' : 'bg-warning text-white'} font-bold rounded-none text-sm`}>{detail?.status}</div>
                {
                    detail?.status === "Waiting for Admin Approval" && 
                    <>
                        <div onClick={() => clickSetuju()} className="py-2 px-4 bg-red-600 text-white font-bold cursor-pointer rounded-none text-sm">
                            {"Setujui"}
                        </div>
                        <div onClick={() => clickTolak()} className="py-2 px-4 text-primary font-bold border border-red-600 rounded-none cursor-pointer text-sm">
                            {"Tolak"}
                        </div>
                    </>
                }
            </div>

            {
                detail?.reason &&
                <div className="alert alert-warning mb-3 rounded-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>{detail?.reason}</span>
                </div>
            }

            <div className="booking-details1 border-2 p-4 mb-3">
                <h1 className="text-xl font-bold text-black">Event Organizer</h1>
                <div className="gap-4 grid grid-cols-2 mt-4">
                    {
                        detail.events_eo.map((item: any, index: number) => (
                            <>
                                <div className="w-full">
                                    <p className="text-lg font-bold text-black">Name</p>
                                    <input value={item.eo_name} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                                    <p className="text-lg font-bold text-black">Phone</p>
                                    <input value={item.eo_phone} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                                    <p className="text-lg font-bold text-black">Email</p>
                                    <input value={item.eo_email} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                                    <p className="text-lg font-bold text-black">Country</p>
                                    <input value={item.country} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                                    <p className="text-lg font-bold text-black">Province</p>
                                    <input value={item.province} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                                </div>
                                <div className="w-full">
                                    <p className="text-lg font-bold text-black">City</p>
                                    <input value={item.city} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                                    <p className="text-lg font-bold text-black">District</p>
                                    <input value={item.district} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                                    <p className="text-lg font-bold text-black">Postal Code</p>
                                    <input value={item.zip_code} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                                    <p className="text-lg font-bold text-black">Address</p>
                                    <textarea value={item.address} className="textarea textarea-bordered rounded-none mt-2 mb-3 w-full" disabled />
                                </div>
                            </>
                        ))
                    }
                </div>
            </div>

            <div className="booking-details1 border-2 p-4 mb-3">
                <h1 className="text-xl font-bold text-black">Data Event</h1>
                <div className="gap-4 mt-4">
                    <div className="w-1/2">
                        <p className="text-lg font-bold text-black">Poster</p>
                        <img src={detail.cover} alt="Gambar" className="mb-4" />

                        <p className="text-lg font-bold text-black">Nama Event</p>
                        <input value={detail.name} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                        <p className="text-lg font-bold text-black">Jenis Event</p>
                        <input value={detail.event_type} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />
                        
                        <p className="text-lg font-bold text-black">Detail Event</p>
                        <textarea value={detail.description} className="textarea textarea-bordered rounded-none mt-2 mb-3 w-full" disabled />

                        <p className="text-lg font-bold text-black">Important Info</p>
                        <textarea value={detail.important_info} className="textarea textarea-bordered rounded-none mt-2 mb-3 w-full" disabled />

                        <p className="text-lg font-bold text-black">Tanggal Event</p>
                        <input value={`${moment(detail.start_date).format('DD MMMM YYYY')} - ${moment(detail.end_date).format('DD MMMM YYYY')}`} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />

                        <p className="text-lg font-bold text-black">Dokumen</p>
                        <Link href={detail.proposal} target="_blank" className="btn btn-primary text-white mt-2"><ViewfinderCircleIcon className="w-4 h-4" /> Lihat Proposal</Link>
                    </div>
                </div>
            </div>

            <div className="booking-details1 border-2 p-4 mb-3">
                {
                    detail.third_party_ticket ? 
                    <>
                        <h1 className="text-xl font-bold text-black">Third Party Ticket</h1>
                        <div className="mb-6">
                            <div className="relative flex-1">
                                <label className="label">
                                    <span className="label-text text-sm font-normal text-black">Link Ticket</span>
                                </label>
                                <input disabled value={detail.third_party_ticket} type="text" placeholder="Third party" className="input input-bordered w-full rounded-none" />
                            </div>
                        </div>
                    </>
                    : null
                }

                {
                    detail.events_packages.length > 0 ?
                    <>
                        <h1 className="text-xl font-bold text-black">Data Packages</h1>
                        <div className="gap-4 mt-4">
                            {
                                detail.events_packages.map((item: any, index: number) => (
                                    <div className="border px-3 mb-3" key={index}>
                                        <div className="flex items-center mt-2 gap-4">
                                            <div className="relative flex-1">
                                                <label className="label">
                                                    <span className="label-text text-sm font-normal text-black">Package {index+1}</span>
                                                </label>
                                                <input disabled value={item.name} type="text" placeholder="Enter Category Package" className="input input-bordered w-full rounded-none" />
                                            </div>
                                            <div className="relative flex-1">
                                                <label className="label">
                                                    <span className="label-text text-sm font-normal text-black">Nominal</span>
                                                </label>
                                                <input disabled value={item.price} type="number" placeholder="Nominal" className="input input-bordered w-full rounded-none" />
                                            </div>
                                            <div className="relative flex-1">
                                                <label className="label">
                                                    <span className="label-text text-sm font-normal text-black">Total Tickets</span>
                                                </label>
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-4/5">
                                                        <input disabled value={item.total_ticket} type="number" placeholder="Total" className="input input-bordered w-full rounded-none" />
                                                    </div>
                                                    {/* <h1 className="text-base font-normal text-black">Rp {totalAmount}</h1> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="my-4 flex items-center">
                                            <input checked type="checkbox" value="Manual Payment" placeholder="Nominal" className="checkbox mx-2 rounded-none" /> Manual Payment
                                            <input checked type="checkbox" value="Refundable" placeholder="Nominal" className="checkbox mx-2 rounded-none" /> Refundable
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                    :
                    null
                }
            </div>

            {
                detail.status === "Waiting for Admin Approval" ?
                <div className="gap-4 border-2 p-4">
                    <button onClick={() => clickSetuju()} className="btn btn-primary rounded-none w-1/2 text-white">Setujui</button>
                    <button onClick={() => clickTolak()} className="btn btn-primary btn-outline  w-1/2 rounded-none hover:text-white">Tolak</button>
                </div> : null
            }

            <dialog id="modal_alasan_tolak" className="modal">
                <section className="modal-box">
                    <h3 className="font-bold text-3xl text-center mb-6">Alasan Ditolak</h3>

                    <textarea onChange={e => setAlasan(e.target.value)} value={alasan} className="textarea textarea-bordered border-2 rounded-none mb-3 w-full" />

                    <button onClick={() => sendAlasan()} className="btn btn-primary rounded-none">Tolak</button>
                    <button onClick={() => tutupModal()} className="btn btn-primary rounded-none btn-outline ms-3">Tutup</button>
                </section>
            </dialog>
        </div>
    </>
  )
}