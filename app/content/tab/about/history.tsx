"use client";

export default function HistoryJIS(){
    return(
        <>
            <section className="p-6">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <img src="/icons/about.svg" alt="icon" />
                        <p className="text-3xl font-bold">History JIS</p>
                    </div>
                    <button className="btn btn-primary rounded-none text-white text-xs font-bold"><img src="/icons/edit.svg" alt="tambah" />Edit</button>
                </div>
                <div className="mt-4 flex flex-col items-center">
                    <div className="">
                        <label className="label">
                            <span className="text-2xl font-bold"><span className="text-primary">*</span> Video</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xl rounded-none" />
                    </div>
                    <div className="">
                        <label className="label mt-4">
                            <span className="text-2xl font-bold"><span className="text-primary">*</span> Image</span>
                        </label>
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xl rounded-none" /><br />
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xl rounded-none mt-2" /><br />
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xl rounded-none mt-2" /><br />
                        <input type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xl rounded-none mt-2" />
                    </div>
                </div>
                <div className="flex justify-between mt-8">
                    <div className="w-1 lg:w-1/3">
                        <div className="bg-primary/10 p-2">
                            <p className="text-xs">Judul Dan Deskripsi Bahasa Indonesia Isi Yang Disebelah Kiri</p>
                        </div>
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Judul</span>
                            </label>
                            <input type="text" placeholder="Judul About" className="input input-bordered w-full max-w-xl rounded-none" />
                        </div>
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Deskripsi</span>
                            </label>
                            <textarea placeholder="Deskripsi About" className="textarea textarea-bordered textarea-md w-full max-w-xl" ></textarea>
                        </div>
                    </div>
                    <div className="w-1 lg:w-1/3">
                        <div className="bg-primary/10 p-2">
                            <p className="text-xs">English Title and Description of Contents to the Right</p>
                        </div>
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Title</span>
                            </label>
                            <input type="text" placeholder="About Title" className="input input-bordered w-full max-w-xl rounded-none" />
                        </div>
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Description</span>
                            </label>
                            <textarea placeholder="About Description" className="textarea textarea-bordered textarea-md w-full max-w-xl" ></textarea>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}