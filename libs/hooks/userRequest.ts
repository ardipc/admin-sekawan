// import useSWR from 'swr';
import { supadmin } from '../supadmin';

// const fetcher = (url: string) => fetch(url).then(res => res.json());
const admin = supadmin();

export const useRequest = async ({ status }: { status: "all" | "requested" | "waiting" | "approved";}) => {
  var query = admin.from("sekawan_request").select(`*, sekawan_kendaraan(*), sekawan_employees(*)`);

  if (status != "all") query.eq('status', status);

  query.order('id', { ascending: false });

  const req = await query;
  return req;
}