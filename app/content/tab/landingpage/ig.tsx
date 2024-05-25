"use client";

import { supadmin } from "@/libs/supadmin";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { InstagramEmbed } from 'react-social-media-embed';

const skema = z.object({
    title: z.string().min(3, {message: "URL is required"}).url({ message: "URL not valid"})
});

type Skema = z.infer<typeof skema>;

export default function InstagramFeeds() {
    const supabase = supadmin();

    const { register, setValue, handleSubmit, formState: { errors }} = useForm<Skema>({ resolver: zodResolver(skema) });

    const [isLoad, setIsLoad] = useState(false);
    const [lists, setLists] = useState<any[]>();

    const fetchData = async () => {
        setIsLoad(true);
        const { data } = await supabase.from("ig_feeds").select().order('id', { ascending: false });
        setLists(data ?? []);
        setIsLoad(false);
    }

    const hapus = async (item: any) => {
        const { error } = await supabase.from("ig_feeds").delete().eq('id', item.id);
        if (!error) {
            fetchData()
        }
    }

    const tambah: SubmitHandler<Skema> = async ({ title }) => {
        setLoad(true);
        let payload = { url: title };
        const { error } = await supabase.from("ig_feeds").insert([payload]);
        if (!error) {
            fetchData()
            setValue('title', "");
        }
        setLoad(false);
    }

    const [load, setLoad] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className="p-6">
            <div className="flex gap-2 items-center mb-3">
                <img src="/icons/document.svg" alt="icon" />
                <p className="text-3xl font-bold">Instagram Feeds</p>
            </div>

            <div className="border-primary border-2 p-5 w-full my-4">
                <form onSubmit={handleSubmit(tambah)}>
                   
                    <div className="grid grid-cols-12">
                        <div className="col-span-8">
                            <input {...register('title')} type="text" placeholder="Enter Public URL Instagram" className="input input-bordered w-full rounded-none mt-2" />
                            { errors.title && <p className="text-primary text-sm my-2">{errors.title?.message}</p> }
                        </div>
                        <div className="col-span-2">
                            <button type="submit" className="btn btn-primary rounded-none mt-2">
                                {load? <div className="loading loading-dots loading-md"></div> : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            {
                isLoad ? <div className="loading loading-dots loading-md"></div>
                :
                <div className="grid grid-cols-2 gap-3">
                    {
                        lists?.map((item: any, index: any) => (
                            <div key={`afd-${index}`} className="border-primary border-2 p-2 w-full">
                                <InstagramEmbed url={item.url} />
                                <button onClick={() => hapus(item)} type="button" className="btn btn-sm btn-primary btn-outline rounded-none">
                                    <p className="text-sm font-bold text-primary hover:text-white">Hapus</p>
                                </button>
                            </div>
                        ))
                    }
                </div>
            }
                   
        </section>
    );
}

