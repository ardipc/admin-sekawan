"use client";

import { deleteFileOnStorage, uploadFileToStorage } from "@/libs/uploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from 'zod';

const skema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    cover: z.string().min(3, { message: "Cover is required" })
});

type Skema = z.infer<typeof skema>;

export default function Activities() {
    const supabase = createClientComponentClient();

    const { register, setValue, handleSubmit, formState: { errors }} = useForm<Skema>({ resolver: zodResolver(skema) });

    const [isLoad, setIsLoad] = useState(false);
    const [lists, setLists] = useState<any[]>();

    const multipleOnChangeFile = async (id: number, key: string, value: FileList | null) => {
        console.log(id, key, value);
        // @ts-ignore
        let copy = [...lists];
        let ind = copy.findIndex((item: any) => item.id === id);

        if (copy[ind]['cover'] != "" || copy[ind]['cover'] != null) {
            await deleteFileOnStorage(supabase, copy[ind]['cover'] || "");
        }

        if (value) {
            const full = await uploadFileToStorage(supabase, value[0]);
            copy[ind]['localKey'] = `f-${moment().format('YYYYMMDDHHmmss')}`;
            copy[ind]['cover'] = full;

            let payload = {
                cover: full
            };
            const { error } = await supabase.from("landing").update(payload).eq('id', id);
            if (!error) console.log('uploaded');

            setLists(copy);
        }
    }

    const multipleOnChange = (id: number, key: string, value: string) => {
        // @ts-ignore
        let copy = [...lists];
        let ind = copy.findIndex((item: any) => item.id === id);
        copy[ind][key] = value;
        setLists(copy);
    }

    const fetchData = async () => {
        setIsLoad(true);
        const { data } = await supabase.from("landing").select().eq('category', 'banner').order('id', { ascending: false });
        const append = data?.map((item: any) => { return { ...item, localKey: `f-${moment().format('YYYYMMDDHHmmss')}` } })
        setLists(data ? append : []);
        setIsLoad(false);
    }

    const hapus = async (item: any) => {
        const { error } = await supabase.from("landing").delete().eq('id', item.id);
        if (!error) {
            fetchData()
            deleteFileOnStorage(supabase, item.cover)
        }
    }

    const edit = async (id: any) => {
        // @ts-ignore
        const clone = [...lists];
        const index = clone.findIndex((item: any) => item.id === id);
        let payload = {
            description: clone[index].description,
            title: clone[index].title,
        }
        const { error } = await supabase.from("landing").update(payload).eq('id', id);
        if (!error) console.log('edited');
    }

    const tambah: SubmitHandler<Skema> = async ({ title, description, cover }) => {
        let payload = {
            cover,
            title,
            description,
            category: 'banner',
            published: true
        };
        const { error } = await supabase.from("landing").insert([payload]);
        if (!error) {
            fetchData()
            
            setValue('title', "");
            setValue('description', "");
            setValue('cover', "");

            setFullPath("");
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const [load, setLoad] = useState(false);
    const [fullPath, setFullPath] = useState("");

    const uploadDoc = async (gambar: any) => {
        setLoad(true);
        const full = await uploadFileToStorage(supabase, gambar);
        setFullPath(full);
        setValue('cover', full);
        setLoad(false);
    };

    const deleteDoc = async () => {
        setLoad(true);
        const isRemoved = await deleteFileOnStorage(supabase, fullPath || "");
        if (isRemoved) {
            setFullPath('');
            setValue('cover', "");
            setLoad(false);
        }
    };

    const onDrop = useCallback((acceptedFiles: any) => {
        ["image/jpg","image/jpeg","image/png"].includes(acceptedFiles[0].type) ?
            uploadDoc(acceptedFiles[0])
            :
            // @ts-ignore
            window.modal_file_error.showModal()
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDrop });

    return (
        <section className="p-6">
            <div className="flex gap-2 items-center mb-3">
                <img src="/icons/document.svg" alt="icon" />
                <p className="text-3xl font-bold">Banner</p>
            </div>

            {
                isLoad ? 
                <div className="border-primary border-2 p-5 lg:w-full my-4"><div className="loading loading-dots loading-md"></div></div>
                :
                <>
                    {
                        lists?.map((item: any, index: any) => (
                            <div key={`afd-${index}`} className="border-primary border-2 p-5 w-full my-4">
                                <div className="flex gap-6">
                                    <div className="w-1 lg:w-1/2">
                                        <h1 className="font-3xl font-bold">Banner {index+1}</h1>
                                        <h1 className="font-2xl font-bold"><span className="text-primary">*</span> Image</h1>
                                        <img src={item.cover} alt="imagehtg" className="mt-2" />
                                        <label className="label">
                                            <span className="label-text text-sm font-normal text-black">Format file: .jpg, .jpeg, .png | File size max 10Mb.<br/>Rekomendasi ukuran gambar 1920x1080 piksel atau rasio 16:9.</span>
                                        </label>
                                        <div className="mt-3">
                                            <label>Change Cover</label>
                                            <input key={item.localKey} onChange={e => multipleOnChangeFile(item.id, 'local', e.target.files)} accept="image/*" type="file" className="file-input file-input-primary file-input-bordered w-full mt-2" />
                                        </div>
                                    </div>
                                    <div className="w-1 lg:w-1/2">
                                        <h1 className="font-2xl font-bold"><span className="text-primary">*</span> Judul</h1>
                                        <input onChange={e => multipleOnChange(item.id, 'title', e.target.value)} value={item.title} type="text" placeholder="Cara ke JIS dengan TJ" className="input input-bordered w-full max-w-xs rounded-none mt-2" />
                                        <h1 className="font-2xl font-bold mt-2"><span className="text-primary">*</span> Deskripsi</h1>
                                        <textarea onChange={e => multipleOnChange(item.id, 'description', e.target.value)} value={item.description} placeholder="Cara ke JIS dengan TJ" className="textarea textarea-bordered w-full max-w-xs rounded-none mt-2" />
                                        
                                        <div className="flex gap-2 mt-4">
                                            <button onClick={() => edit(item.id)} type="button" className="btn btn-sm btn-primary rounded-none">
                                                <img src="/icons/edit.svg" alt="icon" />
                                                <p className="text-sm font-bold text-white">Edit</p>
                                            </button>
                                            <button onClick={() => hapus(item)} type="button" className="btn btn-sm btn-primary btn-outline rounded-none">
                                                <img src="/icons/hapus-active.svg" alt="icon" />
                                                <p className="text-sm font-bold text-primary">Hapus</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </>
            }

            {
                lists && lists?.length < 5 &&
                <div className="border-primary border-2 p-5 lg:w-full my-4">
                    <form onSubmit={handleSubmit(tambah)} className="flex gap-6">
                        <input {...register('cover')} type="hidden" />
                        <div className="w-1 lg:w-1/2">
                            <h1 className="font-2xl font-bold"><span className="text-primary">*</span> Image</h1>
                            {
                                load ?
                                    <span className="loading loading-dots loading-md"></span>
                                    : 
                                    <>
                                    {
                                        fullPath === null || fullPath === "" ?
                                        <>
                                        <div className="flex items-center justify-center w-full mt-1">
                                            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-red-100 hover:bg-red-200 py-24" {...getRootProps()}>
                                            <input {...getInputProps()} className="p-6" />
                                            {
                                                isDragActive ?
                                                <p>Drop the files here ...</p> :
                                                <div className="flex flex-col items-center justify-center">
                                                <svg className="w-8 h-8 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                </svg>
                                                <p className="mb-2 text-sm text-primary">Drag files here or click here</p>
                                            </div>
                                            }
                                            </div>
                                        </div>
                                        </> : <div className="flex justify-between flex-col items-center ps-1 mb-3">
                                            <img src={fullPath} alt="Gambar" />
                                            <button className="btn btn-primary mt-3" onClick={() => deleteDoc()}>Ganti Gambar</button>
                                        </div>
                                    }
                                    </>
                            }
                            <label className="label">
                                <span className="label-text text-sm font-normal text-black">Format file: .jpg, .jpeg, .png | File size max 10Mb.<br/>Rekomendasi ukuran gambar 1920x1080 piksel atau rasio 16:9.</span>
                            </label>
                            { errors.cover && <p className="text-primary text-sm my-2">{errors.cover?.message}</p> }
                        </div>
                        <div className="w-1 lg:w-1/2">
                            <h1 className="font-2xl font-bold"><span className="text-primary">*</span> Judul</h1>
                            <input {...register('title')} type="text" placeholder="Submit" className="input input-bordered w-full max-w-xs rounded-none mt-4" />
                            { errors.title && <p className="text-primary text-sm my-2">{errors.title?.message}</p> }

                            <h1 className="font-2xl font-bold mt-2"><span className="text-primary">*</span> Deskripsi</h1>
                            <textarea {...register('description')} placeholder="Cara ke JIS dengan TJ" className="textarea textarea-bordered w-full max-w-xs rounded-none mt-2" />
                            { errors.description && <p className="text-primary text-sm my-2">{errors.description?.message}</p> }
                                    
                            <div className="flex gap-2 mt-2">
                                <button type="submit" className="btn btn-sm btn-primary rounded-none mt-2">
                                    <p className="text-sm font-bold text-white">Submit</p>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            }
            

            <dialog id="modal_file_error" className="modal">
                <section className="modal-box">
                    <h3 className="font-bold text-lg">Attention!</h3>
                    <p className="py-4">File formats aren't allowed.</p>
                    <div className="modal-action">
                        {/** @ts-ignore */}
                        <button className="btn" onClick={() => window.modal_file_error.close()}>Close</button>
                    </div>
                </section>
            </dialog>

        </section>
    );
}

