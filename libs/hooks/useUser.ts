// import useSWR from 'swr';
import { User } from '@supabase/supabase-js';
import { supadmin } from '../supadmin';

// const fetcher = (url: string) => fetch(url).then(res => res.json());
const admin = supadmin();

export const useUser = async ({ role }: { role: "Administrator" | "Event Organizer" | "Public Visitor";}) => {
  const { data, error } = await admin.auth.admin.listUsers();
  const filters = data.users.filter((item: User) => item.user_metadata.role === role);
  return { error, users: filters }
}