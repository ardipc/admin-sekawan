"use client";

export default function AddRole() {
  return (
    <>
      {/* @ts-ignore */}
        <button type="button" className="btn btn-primary text-white text-sm font-bold rounded-none" onClick={() => window.modal_add_role.showModal()}><img src="/icons/tambah-wt.svg" alt="icon" />Tambah Role & Hak Akses</button>
        <dialog id="modal_add_role" className="modal">
            <form method="dialog" className="modal-box">
            <h3 className="font-bold text-xl text-center">Tambah Role</h3>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <section className="mt-12">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Role</span>
                    </label>
                    <input type="text" placeholder="Role Name" className="input input-bordered" />
                </div>
                <p className="text-sm font-bold mt-6">Hak Akses</p>
                <div className="flex justify-between my-2 items-center">
                    <p className="text-sm">Event</p>
                    <div className="flex gap-2">
                        <div className="form-control">
                            <label className="label cursor-pointer gap-2">
                                <input type="radio" name="radio-1" className="radio radio-primary radio-sm rounded-full" />
                                <span className="label-text text-sm">View Only  <span className="text-primary">*</span></span> 
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer gap-2">
                                <input type="radio" name="radio-1" className="radio radio-primary radio-sm rounded-full" />
                                <span className="label-text text-sm">Approve & Reject <span className="text-primary">*</span></span> 
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between my-2 items-center">
                    <p className="text-sm">Collection</p>
                    <div className="flex gap-2">
                        <div className="form-control">
                            <label className="label cursor-pointer gap-2">
                                <input type="radio" name="radio-2" className="radio radio-primary radio-sm rounded-full" />
                                <span className="label-text text-sm">View Only  <span className="text-primary">*</span></span> 
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer gap-2">
                                <input type="radio" name="radio-2" className="radio radio-primary radio-sm rounded-full" />
                                <span className="label-text text-sm">Approve & Reject <span className="text-primary">*</span></span> 
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between my-2 items-center">
                    <p className="text-sm">User Management</p>
                    <div className="flex gap-2">
                        <div className="form-control">
                            <label className="label cursor-pointer gap-2">
                                <input type="radio" name="radio-3" className="radio radio-primary radio-sm rounded-full" />
                                <span className="label-text text-sm">View Only  <span className="text-primary">*</span></span> 
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer gap-2">
                                <input type="radio" name="radio-3" className="radio radio-primary radio-sm rounded-full" />
                                <span className="label-text text-sm">Approve & Reject <span className="text-primary">*</span></span> 
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between my-2 items-center">
                    <p className="text-sm">Content</p>
                    <div className="flex gap-2">
                        <div className="form-control">
                            <label className="label cursor-pointer gap-2">
                                <input type="radio" name="radio-4" className="radio radio-primary radio-sm rounded-full" />
                                <span className="label-text text-sm">View Only  <span className="text-primary">*</span></span> 
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer gap-2">
                                <input type="radio" name="radio-4" className="radio radio-primary radio-sm rounded-full" />
                                <span className="label-text text-sm">Approve & Reject <span className="text-primary">*</span></span> 
                            </label>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal-action flex justify-center my-4">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-primary text-white">Tambah Role</button>
            </div>
            </form>
        </dialog>
    </>
  )
} 
    