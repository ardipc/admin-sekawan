"use client";
import AddRole from "./addrole";
import Remove from "./delete";

export default function Role(){
    const dataRoles = [
        {
            name: "Administrator",
            event: "Read/Write",
            collection: "Read/Write",
            user: "Read/Write",
            content: "Read/Write",
        },
        {
            name: "Event Organizer",
            event: "Read",
            collection: "Read",
            user: "Read",
            content: "Read",
        },
        {
            name: "Public Visitor",
            event: "Read",
            collection: "Read",
            user: "Read",
            content: "Read",
        }
    ];
    return(
        <>
            <div className="content p-6">
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <img src="/icons/users.svg" alt="icon" />
                    <p className="text-3xl font-bold">Roles</p>
                </div>
                {/* <AddRole /> */}
            </div>
            <div className="flex justify-between my-6">
                <div className="flex gap-2 items-center">
                <p className="text-sm">Show</p>
                <select className="select select-bordered select-sm max-w-xs">
                    <option>5</option>
                    <option>10</option>
                </select>
                <p className="text-sm">Entries</p>
                </div>
                <div className="flex gap-4">
                <input type="text" placeholder="Search..." className="input input-bordered input-sm max-w-xs" />
                <Remove />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                {/* head */}
                <thead className="py-4 px-6 bg-primary/10 border-primary border-2">
                    <tr>
                    <th>
                        <label>
                        <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-sm" />
                        </label>
                    </th>
                    <th className="text-primary font-bold text-sm w-10">ID</th>
                    <th className="text-primary font-bold text-sm">Role</th>
                    <th className="text-primary font-bold text-sm">Event</th>
                    <th className="text-primary font-bold text-sm">Collection</th>
                    <th className="text-primary font-bold text-sm">User Management</th>
                    <th className="text-primary font-bold text-sm">Content</th>
                    <th className="text-primary font-bold text-sm">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    dataRoles.map((item, index) => (
                        <tr>
                        <th>
                            <label>
                            <input type="checkbox" className="checkbox checkbox-primary checkbox-xs rounded-sm" />
                            </label>
                        </th>
                        <td>{index+1}</td>
                        <td>
                            <div className="text-sm">{item.name}</div>
                        </td>
                        <td>{item.event}</td>
                        <td>{item.collection}</td>
                        <td>{item.user}</td>
                        <td>{item.content}</td>
                        <td>
                            <div className="flex gap-2">
                                <button type="button" className="btn btn-sm btn-primary rounded-none">
                                    <img src="/icons/edit.svg" alt="icon" />
                                    <p className="text-sm font-bold text-white">Edit</p>
                                </button>
                                <Remove />
                            </div>
                        </td>
                        </tr>
                    ))
                    }
                </tbody>
                </table>
                <dialog id="modal_delete_akun" className="modal">
                    <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-xl text-center">Hapus Data</h3>
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <section className="mt-12">
                        <p className="text-center text-xs font-medium">Apakah anda yakin menghapus data <span className="font-bold">Akun?</span><br />Anda tidak dapat mengembalikan data yang sudah dihapus.</p>
                    </section>
                    <div className="modal-action flex justify-center my-4 gap-4">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline btn-primary text-white rounded-none">Batal</button>
                        <button className="btn btn-primary text-white rounded-none">Hapus</button>
                    </div>
                    </form>
                </dialog>
            </div>
            <div className="flex justify-between items-center mt-4">
                <p className="text-sm">Menampilkan 1 sampai 10 dari 25 entri</p>
                <div className="join flex">
                <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">Sebelumnya</button>
                <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">1</button>
                <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">2</button>
                <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">3</button>
                <button className="join-item btn-sm btn btn-outline btn-primary rounded-none">Berikutnya</button>
                </div>
            </div>
            </div>
        </>
    )
}