'use client';

import { deleteFileOnStorage, uploadFileToStorage } from "@/libs/uploader";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PreEvent(){
    
    const supabase = createClientComponentClient();

    const [meta, setMeta] = useState<any>();
    
    const [isLoad, setIsLoad] = useState(false);
    const [load, setLoad] = useState(false);

    const [keyProposal, setKeyProposal] = useState(`f-${moment().format('YYYYMMDDHHmmss')}`);
    const [proposal, setProposal] = useState<FileList>();

    const [keyTnc, setKeyTnc] = useState(`t-${moment().format('YYYYMMDDHHmmss')}`);
    const [tnc, setTnc] = useState<FileList>();

    const fetchData = async () => {
        setLoad(true);
        const {data, error} = await supabase.from('metadata').select('id, pre_format_proposal, pre_tnc').eq('id', 1).single();
        if(!error) setMeta(data);
        setLoad(false);
    }

    const upload = async () => {
        setIsLoad(true);
        if(proposal) {
            // delete existing
            if(meta.pre_format_proposal) {
                await deleteFileOnStorage(supabase, meta.pre_format_proposal);
            }

            // upload proposal
            const fullpath = await uploadFileToStorage(supabase, proposal[0]);
            await supabase.from("metadata").update({ pre_format_proposal: fullpath }).eq('id', 1);
        }

        if(tnc) {
            if(meta.pre_tnc) {
                await deleteFileOnStorage(supabase, meta.pre_tnc);
            }

            // upload proposal
            const fullpath = await uploadFileToStorage(supabase, tnc[0]);
            await supabase.from("metadata").update({ pre_tnc: fullpath }).eq('id', 1);
        }

        fetchData();
        setKeyProposal(`f-${moment().format('YYYYMMDDHHmmss')}`)
        setKeyTnc(`t-${moment().format('YYYYMMDDHHmmss')}`);
        setIsLoad(false);
        setLoad(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return(
        <>
            <section className="p-5">
                <div className="flex gap-2 items-center">
                    <img src="/icons/document.svg" alt="icon" />
                    <p className="text-3xl font-bold">Berkas Pendukung</p>
                </div>
                <section>
                    <div className="flex gap-4 items-start">
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Format Proposal</span>
                            </label>
                            <input key={keyProposal} onChange={e => e.target.files && setProposal(e.target.files)} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xl rounded-none" />
                            {
                                load ? <div className="loading loading-dots loading-md mt-2"></div> :
                                <>
                                    {
                                        meta?.pre_format_proposal &&
                                        <div className="border mt-3 p-4">
                                            <Link target="_blank" href={meta.pre_format_proposal} className="btn btn-primary w-full">View File</Link>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                        <div className="form-control w-full max-w-xl mt-4">
                            <label className="label">
                                <span className="text-2xl font-bold"><span className="text-primary">*</span> Terms & Conditions</span>
                            </label>
                            <input key={keyTnc} onChange={e => e.target.files && setTnc(e.target.files)} type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xl rounded-none" />
                            {
                                load ? <div className="loading loading-dots loading-md mt-2"></div> :
                                <>
                                    {
                                        meta?.pre_tnc &&
                                        <div className="border mt-3 p-4">
                                            <Link target="_blank" href={meta.pre_tnc} className="btn btn-primary w-full">View File</Link>
                                        </div>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </section>
                <button onClick={() => upload()} className="btn btn-primary text-white font-bold mt-8 rounded-none">
                    {
                        isLoad ? <div className="loading loading-dots loading-md"></div> : 'Submit'
                    }
                </button>
            </section>
        </>
    )
}