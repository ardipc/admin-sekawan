"use client";
import React, { useState } from "react";
import TabTicket from "./tabticket";
import BtnDetail from "./detailticket";

const event = [
  { alltiket: '300', soldtiket: '64', event: 'Pameran Akhir Tahun', eo: 'Otak-Otak Production', date: '25 Des 2023', location: 'Teater Jakarta', status: '0' },
  { alltiket: '300', soldtiket: '270', event: 'ONE OKE ROCK', eo: 'Budi Purnomo', date: '29 Sep 2023', location: 'Aula Utama Ismail Marzuki', status: '1' },
  { alltiket: '300', soldtiket: '270', event: 'ONE OKE ROCK', eo: 'Budi Purnomo', date: '29 Sep 2023', location: 'Aula Utama Ismail Marzuki', status: '1' },
  { alltiket: '250', soldtiket: '125', event: 'Urang Minang Baralek Gadang', eo: 'Cimol Production', date: '8-11 Des  2023', location: 'Aula Utama Gedung Ismail Marzuki', status: '0' },
  { alltiket: '300', soldtiket: '300', event: 'Persija Jakarta vs Pusamania Borneo', eo: 'Budi Purnomo', date: '25 Sep 2023', location: 'Main Field JIS', status: '2' },
  { alltiket: '200', soldtiket: '80', event: 'Animakini X Ciffest 2023', eo: 'Kentang Production', date: '11 Sep 2023', location: 'Aula Utama Gedung Ismail Marzuki', status: '0' },
]

export default function TicketEvent() {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const filteredAdmin = event.filter((item) => {
    return item.event.toLowerCase().includes(search.toLowerCase())
  })
  return (
    <>
      <div className="content">
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
            <input type="text" placeholder="Search..." className="input input-bordered input-sm max-w-xs" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <table className="table">
              {/* head */}
              <thead className="py-4 px-6 bg-primary/10 border-primary border-2">
                <tr>
                  <th className="text-primary font-bold text-sm w-10">ID</th>
                  <th className="text-primary font-bold text-sm">Nama Event</th>
                  <th className="text-primary font-bold text-sm">Event <br /> Organizer</th>
                  <th className="text-primary font-bold text-sm">Tanggal Event</th>
                  <th className="text-primary font-bold text-sm">Tiket <br /> Terjual</th>
                  <th className="text-primary font-bold text-sm">Tiket <br /> Tersedia</th>
                  <th className="text-primary font-bold text-sm">Detail</th>
                </tr>
              </thead>
              <tbody>
                {
                  filteredAdmin.map((item, index) => (
                    <tr className={selectedItem === index ? "hover bg-gray-200" : "hover"} onClick={() => setSelectedItem}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="text-sm">{item.event}</div>
                      </td>
                      <td>{item.eo}</td>
                      <td>{item.date}</td>
                      <td>{item.soldtiket}</td>
                      <td>{parseInt(item.alltiket) - parseInt(item.soldtiket)}</td>
                      <td><BtnDetail /></td>
                    </tr>
                  ))
                }
                {/* You can open the modal using ID.showModal() method */}
                <dialog id="showDetail" className="modal">
                  <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-xl">Ticket Sales Percentage</h3>
                    <div className="flex my-8 gap-2.5 justify-center items-end text-center">
                      <div className="bg-primary rounded-md h-24 w-14 text-white font-bold">49%</div>
                      <div className="bg-warning rounded-md h-16 w-14 text-white font-bold">39%</div>
                      <div className="bg-success rounded-md h-10 w-14 text-white font-bold">20%</div>
                    </div>
                    <div className="flex my-4 gap-2.5 justify-center">
                      <div className="flex gap-2">
                        <div className="bg-primary rounded-full w-4"></div>
                        <p className="text-xs">VVIP</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-warning rounded-full w-4"></div>
                        <p className="text-xs">VIP</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-success rounded-full w-4"></div>
                        <p className="text-xs">Tribune</p>
                      </div>
                    </div>
                  </form>
                </dialog>
              </tbody>
            </table>
          </div>
          {/* <div className="w-1/2 detail-ticket mt-5">
                        <TabTicket />
                    </div> */}
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