"use client";

import moment from "moment";

export default function DetailNews({ detail, setActive, setDetail }: { detail: any, setActive: any; setDetail: Function; }){
    
    return(
        <>
            <section className="p-5">
                <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                        <div className="cursor-pointer" onClick={() => setActive(0)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                        </div>

                        <p className="text-3xl font-bold">Detail News</p>
                        {
                            detail.is_published ?
                            <span className="badge badge-success text-white ms-2">Published</span>
                            :
                            <span className="badge badge-neutral text-white ms-2">Draft</span>
                        }
                    </div>
                    {/* <button className="btn btn-primary rounded-none text-white text-xs font-bold"><img src="/icons/edit.svg" alt="tambah" />Edit Berita</button> */}
                </div>
                <div className="my-3 p-3 border">
                    <h1 className="font-bold text-2xl mb-2">{detail.title}</h1>
                    <div className="flex gap-2">
                        <p className="italic mb-3 text-sm">{moment(detail.created_at).format('DD MMMM YYYY - HH:mm:ss')}</p>
                    </div>
                    <img src={detail.cover} alt="Image" className="rounded-md" />

                    <div className="my-2 text-justify" dangerouslySetInnerHTML={{__html: detail.content}}></div>

                    <div className="flex gap-2 my-2">
                    {
                        detail.tags.split(',').map((item: string, index: number) => (
                            <span key={`bad-${index}`} className="badge badge-warning text-white">{item}</span>
                        ))
                    }
                    </div>

                    <button onClick={() => {
                        setDetail(detail);
                        setActive(3);
                    }} className="btn btn-primary text-white text-sm font-bold rounded-none mt-4">Edit Berita</button>
                </div>
            </section>
        </>
    )
}