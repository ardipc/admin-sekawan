"use client"
import { useEffect, useState } from 'react';
import { supadmin } from '@/libs/supadmin';
import BtnBank from './addbank';

export default function ListAcc() {
  const supabase = supadmin();
  const [deleteBankId, setDeleteBankId] = useState("");

  const [isLoad, setIsLoad] = useState(false);
  const [banks, setBanks] = useState<any[] | null>()

  const getBanks = async() => {
    setIsLoad(true);
    const { data } = await supabase.from('banks').select();
    setBanks(data)
    setIsLoad(false);
  }
  
  useEffect(() => {
    getBanks();
  }, []);
  
  const deleteBank = (id: any) => {
    // @ts-ignore
    window.modal_delete_bank.showModal();
    setDeleteBankId(id);
  }

  const confirmDelete = async () => {
    const remove = await supabase.from('banks').delete().eq('id', deleteBankId);
    if(remove){
      getBanks()
      setDeleteBankId("");
    }
    // @ts-ignore
    window.modal_delete_bank.close();
  }

  const closeModal = () => {
    setDeleteBankId("");
    // @ts-ignore
    window.modal_delete_bank.close();
  }

  return (
    <>
      <div className="card bg-base-100 mb-6 p-4">
        {/* <Tabel data={data} columns={kolom} /> */}
        <div className="flex justify-between">
            <div className="flex gap-2 items-center">
                <img src="/icons/card.svg" alt="icon" />
                <p className="text-3xl font-bold">List Account Number</p>
            </div>
            <BtnBank fetchBanks={getBanks} />
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="table">
              {/* head */}
              <thead className="py-4 px-6 bg-primary/10 border-primary border-2">
                  <tr>
                      <th className="text-primary font-bold text-sm w-10">ID</th>
                      <th className="text-primary font-bold text-sm">Logo</th>                      
                      <th className="text-primary font-bold text-sm">Nama</th>
                      <th className="text-primary font-bold text-sm">Nomor Rekening</th>
                      <th className="text-primary font-bold text-sm">Nama Pemilik</th>
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
                        banks?.map((item, index) => (
                          <tr key={`sdf-${index}`}>
                              <td>{index + 1}</td>
                              <td>
                                { item.logo && <img src={item.logo} alt="image" /> }
                              </td>
                              <td>
                                <div className="text-sm cursor-pointer text-primary">
                                    {item.name}
                                </div>
                              </td>
                              <td>{item.nomor_rekening}</td>
                              <td>{item.account_owner}</td>
                              <td>
                                  <div className="flex gap-2">
                                      <button type="button" className="btn btn-sm btn-primary rounded-none">
                                          <img src="/icons/edit.svg" alt="icon" />
                                          <p className="text-sm font-bold text-white">Edit</p>
                                      </button>
                                      <button type="button" onClick={()=> deleteBank(item.id)} className="btn btn-sm btn-outline btn-primary rounded-none">
                                          <img src="/icons/hapus-active.svg" alt="icon" />
                                          <p className="text-sm font-bold text-primary hover:text-white">Delete</p>
                                      </button>
                                  </div>
                              </td>
                          </tr>
                        ))
                  }
              </tbody>
          </table>
          
          <dialog id="modal_delete_bank" className="modal">
              <section className="modal-box">
                  <h3 className="font-bold text-3xl text-center">Hapus Data</h3>
                  <button onClick={() => closeModal()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  <section className="my-6">
                      <p className="text-center text-xs font-medium">Apakah anda yakin menghapus data <span className="font-bold">Bank?</span><br />Anda tidak dapat mengembalikan data yang sudah dihapus.</p>
                  </section>
                  <div className="modal-action flex justify-center my-4 gap-4">
                      {/* if there is a button in form, it will close the modal */}
                      <button onClick={() => closeModal()} className="btn btn-outline btn-primary text-white rounded-none">Batal</button>
                      <button type='button' onClick={()=> confirmDelete()} className="btn btn-primary confirm-delete text-white rounded-none">Hapus</button>
                  </div>
              </section>
          </dialog>

          <dialog id="modal_tambah_admin" className="modal">
              <form method="dialog" className="modal-box rounded-none">
                  <div className="flex gap-2 items-center">
                      <img src="/icons/users.svg" alt="icon" />
                      <p className="text-3xl font-bold">Tambah Admin</p>
                  </div>
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                  <section className="mt-12">
                      <div className="form-control w-full my-4">
                          <label className="label">
                              <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Nama</span>
                          </label>
                          <input type="text" placeholder="Masukkan Nama" className="input input-bordered w-full max-w-xs rounded-none" />
                      </div>
                      <div className="form-control w-full my-4">
                          <label className="label">
                              <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Nama Pengguna</span>
                          </label>
                          <input type="text" placeholder="Masukkan Nama Pengguna" className="input input-bordered w-full max-w-xs rounded-none" />
                      </div>
                      <div className="form-control w-full my-4">
                          <label className="label">
                              <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Email</span>
                          </label>
                          <input type="text" placeholder="Masukkan Email" className="input input-bordered w-full max-w-xs rounded-none" />
                      </div>
                      <div className="form-control w-full my-4">
                          <label className="label">
                              <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> No Hp</span>
                          </label>
                          <input type="text" placeholder="Masukkan No Hp" className="input input-bordered w-full max-w-xs rounded-none" />
                      </div>
                      <div className="form-control w-full my-4">
                          <label className="label">
                              <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Password</span>
                          </label>
                          <input type="password" placeholder="Masukkan Password" className="input input-bordered w-full max-w-xs rounded-none" />
                      </div>
                      <div className="form-control w-full my-4">
                          <label className="label">
                              <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Masukkan Ulang Password</span>
                          </label>
                          <input type="password" placeholder="Masukkan Masukkan Ulang Password" className="input input-bordered w-full max-w-xs rounded-none" />
                      </div>
                      <div className="form-control w-full my-4">
                          <label className="label">
                              <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Role</span>
                          </label>
                          <select className="select select-bordered w-full max-w-xs">
                              <option disabled selected>Select Role</option>
                              <option>Admin</option>
                              <option>Super Admin</option>
                          </select>
                      </div>
                  </section>
                  <div className="modal-action my-4 gap-4">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-primary text-white rounded-none">Tambahkan</button>
                  </div>
              </form>
          </dialog>
      </div>
      </div>
    </>
  )
}