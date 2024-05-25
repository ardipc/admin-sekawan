"use client";

export default function Form({ detail, setDetail, setActive }: { detail: any; setDetail: Function; setActive: Function; }) {
  console.log(detail)
  return (
    <>
      <section className="p-5">
        <div className="flex gap-2 items-center">
          <img onClick={() => setActive(0)} src="/icons/document.svg" alt="icon" />
          <p className="text-3xl font-bold">Detail Facility</p>
        </div>
        <div className="flex justify-between mt-8">
          <div className="bg-primary/10 p-2">
            <p className="text-xs">Judul Dan Deskripsi Bahasa Indonesia Isi Yang Disebelah Kiri</p>
          </div>
          <div className="bg-primary/10 p-2">
            <p className="text-xs">English Title and Description of Contents to the Right</p>
          </div>
        </div>
      </section>
    </>
  )
}