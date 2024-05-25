"use client";

import { ChevronLeftIcon, ViewfinderCircleIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import Link from "next/link";

export default function PreDetail({ setActive, detail }: { setActive: any; detail: any; }) {
  
  console.log("detail", detail);

  return(
    <>
        <div className="content p-6">
            <div className="flex gap-2 items-center mb-4">
                <ChevronLeftIcon onClick={() => setActive(0)} className="cursor-pointer w-6 h-6 me-6" />
                <h1 className="text-2xl font-bold">Detail Pre Event</h1>
            </div>

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

                        <p className="text-lg font-bold text-black">Tanggal Event</p>
                        <input value={`${moment(detail.start_date).format('DD MMMM YYYY')} - ${moment(detail.end_date).format('DD MMMM YYYY')}`} className="input input-bordered rounded-none mt-2 mb-3 w-full" disabled />

                        <p className="text-lg font-bold text-black">Dokumen</p>
                        <Link href={detail.proposal} target="_blank" className="btn btn-primary text-white mt-2"><ViewfinderCircleIcon className="w-4 h-4" /> Lihat Proposal</Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}