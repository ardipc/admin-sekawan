"use client";

import { supadmin } from "@/libs/supadmin";
import { useForm } from "react-hook-form";

export default function BtnTambah({ fetchUsers }: { fetchUsers: any; }){

    const supa = supadmin();

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = async (payload: any) => {
        await supa.auth.admin.createUser({
            email: payload.email,
            password: payload.password,
            user_metadata: {
                name: payload.name,
                phone: payload.phone,
                role: "Administrator"
            },
            email_confirm: true
        });
        fetchUsers();
        closeModal();
    }

    const closeModal = () => {
        // @ts-ignore
        window.modal_tambah_admin.close();
        setValue('name', '');
        setValue('email', '');
        setValue('phone', '');
        setValue('password', '');
    }


    return(
        <>
            {/* @ts-ignore */}
            <button type="button" className="btn btn-primary text-white text-sm font-bold rounded-none" onClick={()=> window.modal_tambah_admin.showModal()}><img src="/icons/tambah-wt.svg" alt="icon" />Tambah Admin</button>
            <dialog id="modal_tambah_admin" className="modal">
                <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="modal-box rounded-none">
                    <div className="flex gap-2 items-center">
                        <img src="/icons/users.svg" alt="icon" />
                        <p className="text-3xl font-bold">Tambah Admin</p>
                    </div>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <section className="my-6">
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Fullname</span>
                            </label>
                            <input {...register('name', { required: true })} type="text" placeholder="Masukkan Nama Pengguna" className="input input-bordered w-full max-w-xs rounded-none" />
                        </div>
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Email</span>
                            </label>
                            <input {...register('email', { required: true })} type="text" placeholder="Masukkan Email" className="input input-bordered w-full max-w-xs rounded-none" />
                        </div>
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Phone</span>
                            </label>
                            <input {...register('phone', { required: true })} type="text" placeholder="Masukkan No Hp" className="input input-bordered w-full max-w-xs rounded-none" />
                        </div>
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Password</span>
                            </label>
                            <input {...register('password', { required: true })} type="password" placeholder="Masukkan Password" className="input input-bordered w-full max-w-xs rounded-none" />
                        </div>
                    </section>
                    <div className="modal-action my-4 gap-4">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-primary text-white rounded-none">Tambahkan</button>
                    </div>
                </form>
            </dialog>
        </>
    )
}