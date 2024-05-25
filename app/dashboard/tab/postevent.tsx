"use client";
import { supadmin } from "@/libs/supadmin";
import moment from "moment";
import React, { useEffect, useState } from "react";

const event = [
  { event: 'Pameran Akhir Tahun', eo: 'Otak-Otak Production', date: '25 Des 2023', location: 'Teater Jakarta', status: '0' },
  { event: 'ONE OKE ROCK', eo: 'Budi Purnomo', date: '29 Sep 2023', location: 'Aula Utama Ismail Marzuki', status: '1' },
  { event: 'ONE OKE ROCK', eo: 'Budi Purnomo', date: '29 Sep 2023', location: 'Aula Utama Ismail Marzuki', status: '1' },
  { event: 'Urang Minang Baralek Gadang', eo: 'Cimol Production', date: '8-11 Des  2023', location: 'Aula Utama Gedung Ismail Marzuki', status: '0' },
  { event: 'Persija Jakarta vs Pusamania Borneo', eo: 'Budi Purnomo', date: '25 Sep 2023', location: 'Main Field JIS', status: '2' },
  { event: 'Animakini X Ciffest 2023', eo: 'Kentang Production', date: '11 Sep 2023', location: 'Aula Utama Gedung Ismail Marzuki', status: '0' },
]

export default function PostEvent() {
  const supa = supadmin();

  const [isLoad, setIsLoad] = useState(false);
  const [pre, setPre] = useState<any[] | null>();

  const fetchPre = async () => {
    setIsLoad(true);
    const { data, error } = await supa.from("events")
      .select(`*, events_eo(*)`)
      .eq('content', '0')
      .eq('tipe', 'create')
      .order('id', { ascending: false });
    if (!error) setPre(data);
    setIsLoad(false);
  }

  useEffect(() => {
    fetchPre();
  }, []);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const handleStatusFilterChange = (e: any) => {
    setStatusFilter(e.target.value);
  };

  const [sortedEvent, setSortedEvent] = useState([...event]);
  const filteredAdmin = event.filter((item) => {
    return item.event.toLowerCase().includes(search.toLowerCase())
  }).filter((item) => {
    if (statusFilter === "All") {
      return true;
    }
    return item.status === statusFilter;
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
            <select className="select select-bordered select-sm max-w-xs" onChange={handleStatusFilterChange} value={statusFilter}>
              <option value={"All"}>Status</option>
              <option value={"0"}>Menunggu Persetujuan</option>
              <option value={"1"}>Disetujui</option>
              <option value={"2"}>Ditolak</option>
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
                <th className="text-primary font-bold text-sm">Nama Event</th>
                <th className="text-primary font-bold text-sm">Event Organizer</th>
                <th className="text-primary font-bold text-sm">Tanggal Event</th>
                <th className="text-primary font-bold text-sm">Lokasi</th>
                <th className="text-primary font-bold text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {
                isLoad ?
                  <tr>
                    <td colSpan={6} className="text-center">
                      <span className="loading loading-dots loading-md"></span>
                    </td>
                  </tr>
                  :
                  pre && pre.map((item, index) => (
                    <tr>
                      <td>
                        <label>
                          <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-sm" />
                        </label>
                      </td>
                      <td>{index + 1}</td>
                      <td>
                        <div className="text-sm">{item.name}</div>
                      </td>
                      <td>{item.events_eo.length > 0 ? item.events_eo[0].eo_name : ''}</td>
                      <td>{moment(item.start_date).format('DD MMMM YYYY')}</td>
                      <td>{item.event_type}</td>
                      <td>
                        {item.status === 'Waiting for Admin Approval' ? (
                          <div className="bg-warning/10 p-2 rounded-sm border-2 border-warning text-xs text-center text-warning">{item.status}</div>
                        ) : item.status === 'Approved' ? (
                          <div className="bg-success/10 p-2 rounded-sm border-2 border-success text-xs text-center text-success">{item.status}</div>
                        ) : (
                          <div className="bg-primary/10 p-2 rounded-sm border-2 border-primary text-xs text-center text-primary">{item.status}</div>
                        )}
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
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