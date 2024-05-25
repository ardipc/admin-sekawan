"use client";

export default function BtnDetail(){
    return(
        <>
            {/* @ts-ignore */}
            <button className="btn btn-primary text-white text-sm font-bold" onClick={()=>window.showDetail.showModal()}>View Ticket Sales  </button>
        </>
    )
}