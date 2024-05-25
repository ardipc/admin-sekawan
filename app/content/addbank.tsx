"use client";

import { supadmin } from "@/libs/supadmin";
import { deleteFileOnStorage, uploadFileToStorage } from "@/libs/uploader";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const validationSchema = z.object({
    nama: z.string().min(3, {message: "Name is required"}),
    rekening: z.string().min(10, {message: 'Rekening is required'}),
    pemilik: z.string().min(3, {message: "Owner account is required"}),
    image: z.string().optional()
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function BtnBank({ fetchBanks }: { fetchBanks: any; }){
    const supabase = supadmin();
    const [banks, setBanks] = useState<any[]|null>();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema)
    });

    const getBanks = async() => {
        const { data } = await supabase.from('banks').select();
        setBanks(data)
    }

    const openModal = () => {
        // @ts-ignore
        window.modal_tambah_bank.showModal();
    }

    const closeModal = () => {
        // @ts-ignore
        window.modal_tambah_bank.close();
        setValue('nama', '');
        setValue('image', '');
        setValue('pemilik', '');
        setValue('rekening', '');
        setFullPathImage("");
    }

    const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
        let bank = {
            name: data.nama,    
            logo: data.image,
            nomor_rekening: data.rekening,
            account_owner: data.pemilik
        }
        await supabase.from('banks').insert([bank]).select();
        fetchBanks();
        closeModal();
    }

    const [loadUploadImage, setLoadUploadImage] = useState(false);
    const [fullPathImage, setFullPathImage] = useState(null || "");

    const uplaodImage = async (gambar: any) => {
        setLoadUploadImage(true);
        const full = await uploadFileToStorage(supabase, gambar);
        setFullPathImage(full);
        setValue('image', full);
        setLoadUploadImage(false);
    }

    const deleteImage = async() => {
        setLoadUploadImage(true);
        const isRemoved = await deleteFileOnStorage(supabase, fullPathImage);
        if(isRemoved){
            setFullPathImage('');
            setValue('image', '');
            setLoadUploadImage(false);
        }
    }

    const onDropImage = useCallback((acceptedFiles: any) => {
        uplaodImage(acceptedFiles[0]);
    }, []);

    const { getRootProps,  getInputProps, isDragActive} = useDropzone({onDrop: onDropImage});
    return(
        <>
        {/* @ts-ignore */}
            <button className='btn btn-primary text-white font-bold' onClick={()=> openModal()}>Add Bank Account</button>
            <dialog id="modal_tambah_bank" className="modal">
                <form onSubmit={handleSubmit(onSubmit)} method="dialog" className="modal-box rounded-none">
                    <div className="flex gap-2 items-center">
                        <img src="/icons/users.svg" alt="icon" />
                        <p className="text-3xl font-bold">Tambah Akun Bank</p>
                    </div>
                    <section className="my-6">
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Nama</span>
                            </label>
                            <input {...register('nama')} type="text" placeholder="Masukkan Nama" className="input input-bordered w-full rounded-none" />
                        </div>
                        {errors.nama && (
                            <p className="text-xs italic text-red-500 mt-2">
                            {errors.nama?.message}
                            </p>
                        )}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Logo</span>
                            </label>
                            {
                            loadUploadImage ?
                                <span className="loading loading-dots loading-md"></span>
                                : 
                                <>
                                {
                                    fullPathImage === null || fullPathImage=== "" ?
                                    <>
                                    <div className="flex items-center justify-center w-full mt-1">
                                        <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary border-dashed rounded-lg cursor-pointer bg-red-100 hover:bg-red-200 py-24" {...getRootProps()}>
                                        <input {...getInputProps()} className="p-6" />
                                        {
                                            isDragActive ?
                                            <p>Drop the files here ...</p> :
                                            <div className="flex flex-col items-center justify-center">
                                            <svg className="w-8 h-8 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                            </svg>
                                            <p className="mb-2 text-sm text-primary">Drag files here or</p>
                                            <button className="group relative lg:h-11 lg:w-24 sm:w-24 sm:h-12 overflow-hidden rounded bg-red-700 text-sm font-bold text-white">
                                                Upload File
                                                <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                            </button>
                                        </div>
                                        }
                                        </div>
                                    </div>
                                    </> : <div className="flex justify-between items-center ps-1 mb-3">
                                    <Link href={fullPathImage} className="text-primary cursor-pointer" target="_blank">Open Document</Link>
                                    <span className="badge badge-primary cursor-pointer" onClick={() => deleteImage()}>Delete</span>
                                    </div>
                                }
                                </>
                            }
                            <input {...register('image')} type="hidden" />
                            <label className="label">
                                <span className="label-text text-sm font-normal text-black"><span className="text-red-700">*</span>Format file: .jpg, .jpeg, .png   |   File size max 10Mb</span>
                            </label>
                        </div>
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Nomor Rekening</span>
                            </label>
                            <input {...register('rekening')} type="text" placeholder="Masukkan Nomor Rekening" className="input input-bordered w-full rounded-none" />
                        </div>
                        {errors.rekening && (
                            <p className="text-xs italic text-red-500 mt-2">
                            {errors.rekening?.message}
                            </p>
                        )}
                        <div className="form-control w-full my-4">
                            <label className="label">
                                <span className="label-text text-xl font-bold"><span className="text-primary text-xs">*</span> Pemilik Akun</span>
                            </label>    
                            <input {...register('pemilik')} type="text" placeholder="Masukkan Nama Pemilik Akun" className="input input-bordered w-full rounded-none" />
                        </div>
                        {errors.pemilik && (
                            <p className="text-xs italic text-red-500 mt-2">
                            {errors.pemilik?.message}
                            </p>
                        )}
                    </section>
                    <button type="submit" className="btn btn-primary text-white rounded-none w-full">Tambahkan</button>
                </form>
            </dialog>
        </>
    )
}