"use client";

import { supadmin } from "@/libs/supadmin";
import { deleteFileOnStorage, uploadFileToStorage } from "@/libs/uploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const skema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Name is required"}),
  description: z.string().min(3, { message: "Description is required"}),
  image: z.string().min(3, { message: "Image is required"}),
})

type Skema = z.infer<typeof skema>;

export default function AddVenue({ setActive, item }: { setActive: any, item: any; }) {

  const { register, setValue, handleSubmit, formState: { errors }} = useForm<Skema>({
    resolver: zodResolver(skema),
    defaultValues: async () => {
      return {
        id: item?.id ? String(item?.id) : "",
        name: item?.name ? item?.name : "",
        description: item?.excerpt ? item?.excerpt : "",
        image: item?.cover ? item?.cover : "",
      };
    }
  });

  const [action, setAction] = useState(false);

  const onSubmit: SubmitHandler<Skema> = async (payload) => {
    setAction(true);
    const body = { 
      name: payload.name,
      excerpt: payload.description,
      cover: payload.image,
      tipe: 'venue', 
      content: 0, 
      published: true
    };
    if(payload.id) {
      const {error} = await supabase.from('facilities').update(body).eq('id', payload.id);
      if(!error) setActive(0);
    } else {
      const {error} = await supabase.from('facilities').insert([body]).select();
      if(!error) setActive(0);
    }
    setAction(false);
  }

  const supabase = supadmin();

  const [loadUploadImage, setLoadUploadImage] = useState(false);
  const [fullPathImage, setFullPathImage] = useState(item?.cover ? item?.cover : "");

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

  return (
    <>
      <section className="p-5">
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer" onClick={() => setActive(0)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </div>
          <p className="text-3xl font-bold">Tambah Venue</p>
        </div>
        <div className="flex justify-between mt-8">
          <div className="bg-primary/10 p-2">
            <p className="text-xs">Judul Dan Deskripsi Bahasa Indonesia Isi Yang Disebelah Kiri</p>
          </div>
          <div className="bg-primary/10 p-2">
            <p className="text-xs">English Title and Description of Contents to the Right</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('id')} type="hidden" />
          <input {...register('image')} type="hidden" />

          <div className="flex justify-between mt-4 gap-4">
            {/** kiri */}
            <div className="w-1 lg:w-1/3">
              <div className="form-control w-full max-w-xl mt-4">
                <label className="label">
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Nama</span>
                </label>
                <input {...register('name')} type="text" placeholder="Masukkan Nama Facilities" className="input input-bordered w-full max-w-xl rounded-none" />
                {errors.name && (
                      <p className="text-xs italic text-red-500 mt-2">
                      {errors.name?.message}
                      </p>
                  )}
              </div>
              <div className="form-control w-full max-w-xl mt-4">
                <label className="label">
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Deskripsi</span>
                </label>
                <textarea {...register('description')} placeholder="Masukkan Deskripsi Image" className="textarea textarea-bordered textarea-md w-full max-w-xl rounded-none" ></textarea>
                {errors.description && (
                      <p className="text-xs italic text-red-500 mt-2">
                      {errors.description?.message}
                      </p>
                  )}
              </div>
            </div>

            {/** tengah */}
            <div className="w-1 lg:w-1/3">
              <div className="form-control w-full max-w-xl mt-4">
                <label className="label">
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Image</span>
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
                          </> : 
                          <div className="flex justify-between flex-col items-center ps-1 mb-3">
                            <img src={fullPathImage} className="rounded-md mb-2" alt="Gambar" />
                            <button className="btn btn-sm btn-primary btn-outline w-full" onClick={() => deleteImage()}>Change Image</button>
                          </div>
                      }
                      </>
                  }
                  <input {...register('image', { required: true })} type="hidden" />
                  <label className="label">
                      <span className="label-text text-sm font-normal text-black"><span className="text-red-700">*</span>Format file: .jpg, .jpeg, .png   |   File size max 10Mb</span>
                  </label>
                  {errors.image && (
                      <p className="text-xs italic text-red-500 mt-2">
                      {errors.image?.message}
                      </p>
                  )}
              </div>
            </div>

            {/** kanan */}
            <div className="w-1 lg:w-1/3">
              <div className="form-control w-full max-w-xl mt-4">
                <label className="label">
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Name</span>
                </label>
                <input type="text" placeholder="Enter Facilities Name" className="input input-bordered w-full max-w-xl rounded-none" />
              </div>
              <div className="form-control w-full max-w-xl mt-4">
                <label className="label">
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Description</span>
                </label>
                <textarea placeholder="Enter Description" className="textarea textarea-bordered textarea-md w-full max-w-xl rounded-none" ></textarea>
              </div>
            </div>

          </div>
          <button className="btn btn-primary text-white font-bold rounded-none mt-4">{ action ? <div className="loading loading-dots loading-md"></div> : "Submit"}</button>
        </form>

      </section>
    </>
  )
}