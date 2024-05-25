// import useSWR from 'swr';
import { supadmin } from '../supadmin';

// const fetcher = (url: string) => fetch(url).then(res => res.json());
const admin = supadmin();

export const useVehicles = async ({ angkutan }: { angkutan: "orang" | "barang";}) => {
  const req = await admin.from("sekawan_kendaraan").select().eq('angkutan', angkutan);
  return req;
}