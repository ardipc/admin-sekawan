"use client";

export const ListBookingStatus = [
  {
    label: "Waiting for Payment & Proof of Payment",
    value: "Waiting for Payment",
    bgColor: "bg-red-50",
    textColor: "text-primary"
  },
  {
    label: "Waiting for Admin Approval",
    value: "Waiting for Proof of Payment",
    bgColor: "bg-red-50",
    textColor: "text-primary"
  },
  {
    label: "Purchase Canceled By Admin",
    value: "Purchase Canceled By Admin",
    bgColor: "bg-red-50",
    textColor: "text-primary"
  },
  {
    label: "Done",
    value: "Done",
    bgColor: "bg-green-50",
    textColor: "text-success"
  },
];

export const ListEventStatus = [
  {
    label: "Waiting for Admin Approval",
    value: "Waiting for Admin Approval",
    bgColor: "bg-red-50",
    textColor: "text-primary"
  },
  {
    label: "Rejected",
    value: "Rejected",
    bgColor: "bg-red-50",
    textColor: "text-primary"
  },
  {
    label: "Approved",
    value: "Approved",
    bgColor: "bg-green-50",
    textColor: "text-success"
  },
];

export function ComponentBookingStatus({ status }: { status: string; }) {
  const find = ListBookingStatus.filter((item) => item.value === status);
  const info = find.length ? find[0] : { label: "", value: "", bgColor: "", textColor: "" };
  return (
    <div className={`status ${info.bgColor} flex p-2 rounded`}>
      <p className={`text-sm font-bold ${info.textColor}`}>{info.label}</p>
    </div>
  )
}

export function ComponentEventStatus({ status }: { status: string; }) {
  const find = ListEventStatus.filter((item) => item.value === status);
  const info = find.length ? find[0] : { label: "", value: "", bgColor: "", textColor: "" };
  return (
    <span className="py-1 px-3 rounded-lg bg-status">{info.label}</span>
  )
}