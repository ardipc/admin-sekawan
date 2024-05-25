"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { z } from "zod";

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { deleteFileOnStorage, uploadFileToStorage } from "@/libs/uploader";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useDropzone } from "react-dropzone";

const skema = z.object({
    title: z.string().min(3, { message: "Title is required" }),
    cover: z.string().min(3, { message: "Cover is required" }),
    content: z.string().min(3, { message: "Content is required" }),
    tags: z.string().array(),
    category_id: z.number(),
});

type Skema = z.infer<typeof skema>;

export default function EditNews({ detail, setActive }: { detail: any, setActive: any; }){
    const [richText, setRichText] = useState('');

    const { register, setValue, handleSubmit, formState: { errors }} = useForm<Skema>({ 
        resolver: zodResolver(skema),
        defaultValues: async () => {
            return {
                title: detail.title,
                cover: detail.cover,
                content: detail.content,
                tags: detail.tags.split(','),
                category_id: detail.category_id
            }
        }
    });

    const onSubmit: SubmitHandler<Skema> = async (data) => {
        let payload = {
            title: data.title,
            cover: data.cover,
            content: data.content,
            category_id: data.category_id,
            tags: data.tags.join(','),
        };
        // console.log(payload);
        const update = await supabase.from('news').update(payload).eq('id', detail.id).select();
        if(update) {
            setActive(0);
        }
    }

    const onBlurQuill = () => {
        setValue('content', richText);
    }

    const [categoryId, setCategoryId] = useState<any>(null);
    const changeSelect = ({value, label}: any) => {
        setValue('category_id', value);
        setCategoryId(value);
    }

    const [optionsTag, setOptionsTag] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const changeMultiSelect = (value: any[]) => {
        // console.log(value)
        setValue('tags', value.map((item: any) => { return item.value; }));
        setTags(value.map((item: any) => { return { label: item.label, value: item.value } }))
    }

    const [load, setLoad] = useState(false);
    const [fullPath, setFullPath] = useState("");

    const supabase = createClientComponentClient();

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

    useEffect(() => {
        fetchData();
        
        setRichText(detail.content);
        setValue('content', detail.content);

        setFullPath(detail.cover);
        setValue('cover', detail.cover);

        setCategoryId(detail.category_id);

        setOptionsTag(detail.tags.split(',').map((item: any) => { return {value: item, label: item}}));
        setTags(detail.tags.split(',').map((item: any) => { return {value: item, label: item}}));
    }, []);

    const [categories, setCategories] = useState<any[]>([]);

    const fetchData = async () => {
        const {data} = await supabase.from('categories').select('id, title').order('id', { ascending: false });
        if(data){
            const reFormat = data.map((item: any) => { return { label: item.title, value: item.id }});
            setCategories(reFormat);
        }
    }
    
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <div className="cursor-pointer" onClick={() => setActive(0)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </div>

                        <p className="text-3xl font-bold">Edit News</p>
                    </div>
                    {/* <button className="btn btn-primary rounded-none text-white text-xs font-bold"><img src="/icons/edit.svg" alt="tambah" />Edit Berita</button> */}
                </div>
                <div className="my-7">
                    <div className="form-control w-full mt-4">
                        <label className="label">
                            <span className="text-2xl font-bold"><span className="text-primary">*</span> Judul Berita</span>
                        </label>
                        <input {...register('title')} type="text" placeholder="Judul Berita" className="input input-bordered w-full rounded-none" />
                        {
                            errors.title && <p className="text-xs italic text-red-600 my-2">{errors.title.message}</p>
                        }
                    </div>
                    <div className="mt-4">
                        <label className="label">
                            <span className="text-2xl font-bold"><span className="text-primary">*</span> Image</span>
                        </label>
                        <input {...register('cover')} type="hidden" />
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
                                    </> : <div className="flex justify-between flex-col items-start ps-1 mb-3">
                                        <img src={fullPath} alt="Gambar" />
                                        <button className="btn btn-primary mt-3" onClick={() => deleteDoc()}>Ganti Gambar</button>
                                    </div>
                                }
                                </>
                        }                            
                        <label className="label">
                            <span className="label-text text-sm font-normal text-black"><span className="text-primary">*</span>Format file: .jpg, .jpeg, .png   |   File size max 10Mb</span>
                        </label>
                        { errors.cover && <p className="text-primary text-sm my-2">{errors.cover?.message}</p> }
                    </div>
                    <div className="mt-4">
                        <label className="label">
                            <span className="text-2xl font-bold"><span className="text-primary">*</span> Deskripsi Berita</span>
                        </label>
                        <ReactQuill onBlur={() => onBlurQuill()} theme="snow" value={richText} onChange={setRichText} className="mt-2" />
                    </div>
                    <div className="form-control w-full max-w-xs mt-4">
                        <label className="label">
                            <span className="text-2xl font-bold"><span className="text-primary">*</span> Kategori</span>
                        </label>
                        {/* <input {...register('category_id')} type="text" placeholder="#JIS #seminar #acara " className="input input-bordered w-full max-w-xl rounded-none" /> */}
                        <Select value={categories.filter((item: any) => item.value === categoryId)} onChange={(value: any) => changeSelect(value)} options={categories} theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                        })} />
                    </div>
                    <div className="form-control w-full max-w-xs mt-4">
                        <label className="label">
                            <span className="text-2xl font-bold"><span className="text-primary">*</span> Tag</span>
                        </label>
                        <CreatableSelect value={tags} isMulti onChange={(value: any) => changeMultiSelect(value)} options={optionsTag} theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                        })} />
                    </div>
                    <button type="submit" className="btn btn-primary text-white text-sm font-bold rounded-none mt-4">Simpan Berita</button>
                </div>
            </form>
        </>
    )
}