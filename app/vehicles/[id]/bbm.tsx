"use client";
import React, { useEffect, useState } from "react";
import DatePick from "../datepick";
import { User } from "@supabase/supabase-js";
import { JsonView } from 'react-json-view-lite';
import { useBBMVehicleByID } from "@/libs/hooks/useVehicles";
import moment from "moment";

export default function BBM({ vehicle }: { vehicle: number }) {

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isLoad, setIsLoad] = useState(false);
  const [users, setUsers] = useState<any[]>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoad(true);
    const { data, error } = await useBBMVehicleByID({ id: vehicle });
    if (!error) setUsers(data);
    setIsLoad(false);
  }

  const handleStatusFilterChange = (e: any) => {
    setStatusFilter(e.target.value);
  };

  const showInfoUser = (user: User) => {
    setInfoUser(user);
    // @ts-ignore
    window.modal_info_user.showModal();
  }

  const closeInfoUser = () => {
    setInfoUser(undefined);
    // @ts-ignore
    window.modal_info_user.close();
  }

  const [infoUser, setInfoUser] = useState<User>();

  return (
    <>
      <div className="content p-6">
        <div className="w-1/2">
          <ul className="timeline timeline-vertical">
            {
              users && users.map((item: any, index: number) => (
                <li key={index}>
                  <hr />
                  <div className="timeline-start">{moment(item.created_at).format('LLL')}</div>
                  <div className="timeline-middle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                  </div>
                  <div className="timeline-end timeline-box">{item.deskripsi}</div>
                  {
                    index === 0 ? <hr /> : null
                  }
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  )
}