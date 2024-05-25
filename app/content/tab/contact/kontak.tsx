"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Kontak(){
    const supa = createClientComponentClient();

    const [isLoad, setIsLoad] = useState(false);

    const fetchMetadata = async () => {
        const { data, error } = await supa.from("metadata").select().eq('id', 1).single();
        if(!error) {
            setValue('phone', data.phone);
            setValue('address', data.address);
            setValue('email', data.email);
            setValue('whatsapp', data.whatsapp);
            setValue('instagram', data.instagram);
            setValue('tiktok', data.tiktok);
        }
    }

    useEffect(() => {
        fetchMetadata();
    }, []);

    const { register, setValue, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        setIsLoad(true);
        await supa.from("metadata").update(data).eq(`id`, 1);
        setIsLoad(false);
    }

    return(
        <>
            <section className="p-5">
                <div className="my-7">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex gap-2 items-center">
                            <img src="/icons/contact.svg" alt="icon" />
                            <p className="text-3xl font-bold">Contact</p>
                        </div>
            
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Phone</span>
                            </label>
                            <input {...register('phone', { required: true })} type="text" placeholder="Nomor Telepon" className="input input-bordered w-full max-w-xl rounded-none" />
                        </div>
                        <div className="flex gap-4 mt-4">
                            <div className="form-control w-full max-w-xl mt-4">
                                <label className="label">
                                    <span className="text-2xl font-bold"><span className="text-primary">*</span> Address</span>
                                </label>
                                <textarea {...register('address', { required: true })} placeholder="Alamat Lokasi" className="textarea textarea-bordered textarea-md w-full max-w-xl rounded-none" ></textarea>
                            </div>
                        </div>
                        
                        <div className="flex gap-2 items-center mt-6">
                            <img src="/icons/world.svg" alt="icon" />
                            <p className="text-3xl font-bold">Sosmed</p>
                        </div>
                        
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Email</span>
                            </label>
                            <input {...register('email', { required: true })} type="text" placeholder="Email" className="input input-bordered w-full max-w-xl rounded-none" />
                        </div>
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Instagram</span>
                            </label>
                            <input {...register('instagram', { required: true })} type="text" placeholder="Link Instagram" className="input input-bordered w-full max-w-xl rounded-none" />
                        </div>
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> WhatsApp</span>
                            </label>
                            <input {...register('whatsapp', { required: true })} type="text" placeholder="Nomor WhatsApp" className="input input-bordered w-full max-w-xl rounded-none" />
                        </div>
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Tiktok</span>
                            </label>
                            <input {...register('tiktok', { required: true })} type="text" placeholder="Tiktok" className="input input-bordered w-full max-w-xl rounded-none" />
                        </div>

                        <div className="flex mt-8">
                            <button className="btn btn-primary text-white text-sm font-bold rounded-none">
                                { isLoad ? <div className="loading loading-dots loading-md"></div> : "Simpan" }
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}