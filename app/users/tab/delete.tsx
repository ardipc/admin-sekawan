"use client";

export default function HapusButton() {
  return (
    <>
      {/* @ts-ignore */}
        <button type="button" className="btn btn-outline btn-sm btn-primary rounded-none" onClick={() => window.modal_delete_akun.showModal()}><img src="/icons/hapus-active.svg" alt="icon" /><p className="text-sm font-bold text-primary">Hapus</p>
        </button>
    </>
  )
} 
    