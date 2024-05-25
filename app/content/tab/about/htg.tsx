"use client";

export default function HowToGet(){
    return(
        <>
            <section className="p-6">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <img src="/icons/transportation.svg" alt="icon" />
                        <p className="text-3xl font-bold">How To Get</p>
                    </div>
                    <button className="btn btn-primary rounded-none text-white text-xs font-bold"><img src="/icons/edit.svg" alt="tambah" />Edit</button>
                </div>
                <div className="flex justify-between my-7">
                    <div className="bg-primary/10 p-2">
                        <p className="text-xs">Judul Dan Deskripsi Bahasa Indonesia Isi Yang Disebelah Kiri</p>
                    </div>
                    <div className="bg-primary/10 p-2">
                        <p className="text-xs">English Title and Description of Contents to the Right</p>
                    </div>
                </div>
                <div className="flex justify-between items-end mt-8">
                    <div className="w-1 lg:w-1/3">
                        <div className="border border-primary p-5">
                            <div className="form-control w-full max-w-xl">
                                <label className="label">
                                    <span className="text-2xl font-bold"><span className="text-primary">*</span> Judul</span>
                                </label>
                                <input type="text" placeholder="Judul About" className="input input-bordered w-full max-w-xl rounded-none" />
                            </div>
                            <div className="form-control w-full max-w-xl mt-4">
                                <label className="label">
                                    <span className="text-2xl font-bold"><span className="text-primary">*</span> Deskripsi</span>
                                </label>
                                <textarea placeholder="Deskripsi About" className="rounded-none textarea textarea-bordered textarea-md w-full max-w-xl" ></textarea>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button type="button" className="btn btn-sm btn-primary rounded-none">
                                    <img src="/icons/edit.svg" alt="icon" />
                                    <p className="text-sm font-bold text-white">Edit</p>
                                </button>
                                <button type="button" className="btn btn-sm btn-primary btn-outline rounded-none">
                                    <img src="/icons/hapus-active.svg" alt="icon" />
                                    <p className="text-sm font-bold text-primary">Hapus</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <label className="label">
                            <span className="text-xl font-bold"><span className="text-primary">*</span> Image</span>
                        </label>
                        <img src="/images/htg-1.png" alt="image" className="mt-2" />
                    </div>
                    <div className="w-1 lg:w-1/3">
                        <div className="border border-primary p-5">
                            <div className="form-control w-full max-w-xl">
                                <label className="label">
                                    <span className="text-2xl font-bold"><span className="text-primary">*</span> Title</span>
                                </label>
                                <input type="text" placeholder="About Title" className="input input-bordered w-full max-w-xl rounded-none" />
                            </div>
                            <div className="form-control w-full max-w-xl mt-4">
                                <label className="label">
                                    <span className="text-2xl font-bold"><span className="text-primary">*</span> Description</span>
                                </label>
                                <textarea placeholder="About Description" className="rounded-none textarea textarea-bordered textarea-md w-full max-w-xl" ></textarea>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button type="button" className="btn btn-sm btn-primary rounded-none">
                                    <img src="/icons/edit.svg" alt="icon" />
                                    <p className="text-sm font-bold text-white">Edit</p>
                                </button>
                                <button type="button" className="btn btn-sm btn-primary btn-outline rounded-none">
                                    <img src="/icons/hapus-active.svg" alt="icon" />
                                    <p className="text-sm font-bold text-primary">Hapus</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-end mt-8">
                    <div className="w-1 lg:w-1/3">
                        <div className="border border-primary p-5">
                            <div className="form-control w-full max-w-xl">
                                <label className="label">
                                    <span className="text-2xl font-bold"><span className="text-primary">*</span> Judul</span>
                                </label>
                                <input type="text" placeholder="Judul About" className="input input-bordered w-full max-w-xl rounded-none" />
                            </div>
                            <div className="form-control w-full max-w-xl mt-4">
                                <label className="label">
                                    <span className="text-2xl font-bold"><span className="text-primary">*</span> Deskripsi</span>
                                </label>
                                <textarea placeholder="Deskripsi About" className="rounded-none textarea textarea-bordered textarea-md w-full max-w-xl" ></textarea>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button type="button" className="btn btn-sm btn-primary rounded-none">
                                    <img src="/icons/edit.svg" alt="icon" />
                                    <p className="text-sm font-bold text-white">Edit</p>
                                </button>
                                <button type="button" className="btn btn-sm btn-primary btn-outline rounded-none">
                                    <img src="/icons/hapus-active.svg" alt="icon" />
                                    <p className="text-sm font-bold text-primary">Hapus</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="border border-primary p-4">
                        <h1 className="font-2xl font-bold"><span className="text-primary">*</span> Image</h1>
                        <div className="flex items-center justify-center w-full mt-2">
                            <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-primary border-dashed cursor-pointer bg-red-100 hover:bg-red-200 py-24 rounded-none">
                                <div className="flex flex-col items-center justify-center">
                                    <svg className="w-8 h-8 mb-4 text-primary" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-primary">Drag files here or</p>
                                    <button className="group relative lg:h-11 lg:w-24 sm:w-24 sm:h-12 overflow-hidden rounded bg-red-700 text-sm font-bold text-white">
                                        Upload File
                                        <div className="absolute inset-0 h-full w-full scale-0 rounded transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <label className="label">
                            <span className="label-text text-sm font-normal text-black"><span className="text-primary">*</span>Format file: .jpg, .jpeg, .png   |   File size max 10Mb</span>
                        </label>
                    </div>
                    <div className="w-1 lg:w-1/3">
                        <div className="border border-primary p-5">
                            <div className="form-control w-full max-w-xl">
                                <label className="label">
                                    <span className="text-2xl font-bold"><span className="text-primary">*</span> Title</span>
                                </label>
                                <input type="text" placeholder="About Title" className="input input-bordered w-full max-w-xl rounded-none" />
                            </div>
                            <div className="form-control w-full max-w-xl mt-4">
                                <label className="label">
                                    <span className="text-2xl font-bold"><span className="text-primary">*</span> Description</span>
                                </label>
                                <textarea placeholder="About Description" className="rounded-none textarea textarea-bordered textarea-md w-full max-w-xl" ></textarea>
                            </div>
                            <div className="flex gap-2 mt-4">
                                <button type="button" className="btn btn-sm btn-primary rounded-none">
                                    <img src="/icons/edit.svg" alt="icon" />
                                    <p className="text-sm font-bold text-white">Edit</p>
                                </button>
                                <button type="button" className="btn btn-sm btn-primary btn-outline rounded-none">
                                    <img src="/icons/hapus-active.svg" alt="icon" />
                                    <p className="text-sm font-bold text-primary">Hapus</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary rounded-none text-white text-xs font-bold mt-4"><img src="/icons/tambah-wt.svg" alt="tambah" />Tambah Rute</button>
            </section>
        </>
    )
}