// import useSWR from 'swr';
import { supadmin } from '../supadmin';

// const fetcher = (url: string) => fetch(url).then(res => res.json());
const admin = supadmin();

export const useVehicles = async ({ angkutan }: { angkutan: "orang" | "barang";}) => {
  const req = await admin.from("sekawan_kendaraan").select().eq('angkutan', angkutan);
  return req;
}

export const useBBMVehicleByID = async ({ id }: { id: number;}) => {
  const req = await admin.from("sekawan_kendaraan_bbm").select().eq('kendaraan_id', id).order('id', { ascending: false });
  return req;
}

export const useServiceVehicleByID = async ({ id }: { id: number;}) => {
  const req = await admin.from("sekawan_kendaraan_service").select().eq('kendaraan_id', id).order('id', { ascending: false });
  return req;
}

export const useUsageVehicleByID = async ({ id }: { id: number;}) => {
  const req = await admin.from("sekawan_kendaraan_pemakaian").select().eq('kendaraan_id', id).order('id', { ascending: false });
  return req;
}