"use client";

import { supadmin } from "@/libs/supadmin";
import { deleteFileOnStorage, uploadFileToStorage } from "@/libs/uploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { z } from "zod";

const skema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Name is required"}),
  excerpt: z.string().min(3, { message: "Excerpt is required"}),
  description: z.string().min(3, { message: "Description is required"}),
  important_info: z.string().min(3, { message: "Important info is required"}),
  image: z.string().min(3, { message: "Image is required"}),
})

type Skema = z.infer<typeof skema>;

const paket = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: "Name is required"}),
  price: z.string().min(0, { message: "Price minimum is 0"}),
  information: z.string().array()
})

type Paket = z.infer<typeof paket>;

const pakets = z.object({
  packages: z.array(paket)
});

type Pakets = z.infer<typeof pakets>;

export default function AddVenue({ setActive, item }: { setActive: any, item: any; }) {

  const { register, watch, setValue, handleSubmit, formState: { errors }} = useForm<Skema>({
    resolver: zodResolver(skema),
    defaultValues: async () => {
      return {
        id: item?.id ? String(item?.id) : "",
        name: item?.name ? item?.name : "",
        excerpt: item?.excerpt ? item?.excerpt : "",
        description: item?.description ? item?.description : "",
        important_info: item?.important_info ? item?.important_info : "",
        image: item?.cover ? item?.cover : "",
      };
    }
  });

  const paketsForm = useForm<Pakets>({
    resolver: zodResolver(pakets),
    defaultValues: async () => {
      if(item?.facilities_packages.length) {
        const temp: any[] = [];
        item?.facilities_packages.map((item: any) => {
          temp.push({
            id: item.id,
            name: item.name,
            price: String(item.price),
            information: item.information.split('|')
          })
        })
        return {
          packages: temp
        }
      } else {
        return {
          packages: [
            {
              id: 0,
              name: "",
              price: "0",
              information: []
            }
          ]
        }
      }
    }
  })

  console.log('paket', item)

  const [action, setAction] = useState(false);
  const [actionPaket, setActionPaket] = useState(false);
  const [facId, setFacId] = useState(item?.id ?? 0);

  const onSubmit: SubmitHandler<Skema> = async (payload) => {
    setAction(true);
    const body = { 
      name: payload.name,
      description: payload.description,
      excerpt: payload.excerpt,
      important_info: payload.important_info,
      cover: payload.image,
      tipe: 'facility', 
      content: 0, 
      published: true
    };

    if(facId) {
      const {error} = await supabase.from('facilities').update(body).eq('id', facId);
      if(!error) setActive(0);
    } else {
      const {data,error} = await supabase.from('facilities').insert([body]).select().single();
      if(!error) {
        setFacId(data?.id);
        // setActive(0);
      }
    }
    setAction(false);
  }

  const onSubmitPaket: SubmitHandler<Pakets> = async (payload) => {
    setActionPaket(true);
    payload.packages.map(async (item: Paket) => {
      const data = {
        facility_id: facId,
        name: item.name,
        price: Number(item.price),
        information: item.information.join('|'),
      };
      if(item.id) {
        // action update
        await supabase.from("facilities_packages").update(data).eq('id', item.id);
      } else {
        // action insert
        await supabase.from("facilities_packages").insert([data]).eq('id', item.id);
      }
    })
    setActionPaket(false);
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

  const onBlurQuill = (name: any, value: string) => {
    setValue(name, value);
  }

  const [descriptionText, setDescriptionText] = useState(item?.description ?? "");
  const [importantText, setImportantText] = useState(item?.important_info ?? "");

  const { getRootProps,  getInputProps, isDragActive} = useDropzone({onDrop: onDropImage});

  const remove = async (value: number, id: any) => {
    const p = paketsForm.getValues('packages');
    const del = p.filter((_: any, index: number) => index != value);
    paketsForm.setValue('packages', del);
    if (id != 0) {
      await supabase.from('facilities_packages').delete().eq('id', id);
    }
  }

  const append = () => {
    const p = paketsForm.getValues('packages');
    const paket: Paket = {
      id: 0,
      name: '',
      price: '0',
      information: [],
    }
    const add = [...p, paket];
    paketsForm.setValue('packages', add);
  }

  return (
    <>
      <section className="p-5">
        <div className="flex gap-2 items-center">
          <div className="cursor-pointer" onClick={() => setActive(0)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </div>
          <p className="text-3xl font-bold">Tambah Fasilitas</p>
        </div>
        <div className="flex justify-between mt-8">
          <div className="bg-primary/10 p-2">
            <p className="text-xs">Judul Dan Deskripsi Bahasa Indonesia Isi Yang Disebelah Kiri</p>
          </div>
          <div className="bg-primary/10 p-2">
            <p className="text-xs">English Title and Description of Contents to the Right</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="border-2 p-3">
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
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Kutipan</span>
                </label>
                <textarea {...register('excerpt')} placeholder="Masukkan Kutipan" className="textarea textarea-bordered w-full max-w-xl rounded-none" />
                {errors.excerpt && (
                      <p className="text-xs italic text-red-500 mt-2">
                      {errors.excerpt?.message}
                      </p>
                  )}
              </div>
              <div className="form-control w-full max-w-xl mt-4">
                <label className="label">
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Deskripsi</span>
                </label>
                <ReactQuill onBlur={() => onBlurQuill('description', descriptionText)} theme="snow" value={descriptionText} onChange={setDescriptionText} className="mt-2" />
                {errors.description && (
                      <p className="text-xs italic text-red-500 mt-2">
                      {errors.description?.message}
                      </p>
                  )}
              </div>
              <div className="form-control w-full max-w-xl mt-4">
                <label className="label">
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Info Penting</span>
                </label>
                <ReactQuill onBlur={() => onBlurQuill('important_info', importantText)} theme="snow" value={importantText} onChange={setImportantText} className="mt-2" />
                {errors.important_info && (
                      <p className="text-xs italic text-red-500 mt-2">
                      {errors.important_info?.message}
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
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Excerpt</span>
                </label>
                <textarea placeholder="Enter Excerpt" className="textarea textarea-bordered w-full max-w-xl rounded-none" />
              </div>
              <div className="form-control w-full max-w-xl mt-4">
                <label className="label">
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Description</span>
                </label>
                <ReactQuill theme="snow" className="mt-2" />
              </div>
              <div className="form-control w-full max-w-xl mt-4">
                <label className="label">
                  <span className="text-2xl font-bold"><span className="text-primary">*</span> Important Info</span>
                </label>
                <ReactQuill theme="snow" className="mt-2" />
              </div>
            </div>

          </div>
          <button className="btn btn-primary text-white font-bold rounded-none mt-4">{ action ? <div className="loading loading-dots loading-md"></div> : "Simpan"}</button>
        </form>

        {
          facId ?
          <form onSubmit={paketsForm.handleSubmit(onSubmitPaket)} className="border-2 mt-3 p-3">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold text-2xl">Packages</h2>
              <button onClick={()=>append()} className="btn group relative overflow-hidden rounded text-sm font-bold text-white bg-primary">
                  + Add Package
                  <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
              </button>
            </div>
            {paketsForm.watch('packages') && paketsForm.watch('packages').length > 0 && paketsForm.watch('packages').map((paket: Paket, index: number) => {
                return(
                <div key={index} className="border py-2 px-4 mb-2">
                    <div className="flex items-center gap-4">
                        <div className="relative flex-1">
                            <label className="label">
                                <span className="label-text text-sm font-normal text-black"> Package {index+1}</span>
                            </label>
                            <input {...paketsForm.register(`packages.${index}.name`, {required: true})} type="text" placeholder="Enter Package" className="input input-bordered w-full" />
                            {
                              paketsForm.formState.errors.packages && <p className="text-xs mt-2 italic text-red-600">{paketsForm.formState.errors.packages[index]?.name?.message}</p>
                            }
                        </div>
                        <div className="relative flex-1">
                            <label className="label">
                                <span className="label-text text-sm font-normal text-black">Price</span>
                                {
                                  <img onClick={()=>remove(index, paket.id)} className="w-6 cursor-pointer" src="/icons/trash.svg" alt="hapus" />
                                }
                            </label>
                            <input {...paketsForm.register(`packages.${index}.price`, {required: true})} type="number" placeholder="Nominal" className="input input-bordered w-full" />
                            {
                              paketsForm.formState.errors.packages && <p className="text-xs mt-2 italic text-red-600">{paketsForm.formState.errors.packages[index]?.price?.message}</p>
                            }
                        </div>
                    </div>
                    <div className="my-4 flex items-center">
                        <input {...paketsForm.register(`packages.${index}.information`)} type="checkbox" value="Manual Payment" placeholder="Nominal" className="checkbox mx-2" /> Manual Payment
                        <input {...paketsForm.register(`packages.${index}.information`)} type="checkbox" value="Refundable" placeholder="Nominal" className="checkbox mx-2" /> Refundable
                        {
                          paketsForm.formState.errors.packages && <p className="text-xs mt-2 italic text-red-600">{paketsForm.formState.errors.packages[index]?.information?.message}</p>
                        }
                    </div>
                </div>
              )
            })}
            <button className="btn btn-primary text-white font-bold rounded-none mt-4">{ actionPaket ? <div className="loading loading-dots loading-md"></div> : "Simpan"}</button>
          </form>
          : null
        }

      </section>
    </>
  )
}