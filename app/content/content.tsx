"use client"
import { supadmin } from '@/libs/supadmin';
import Tab from './tab/tab';

export default function Content() {
  const supabase = supadmin();
  
  return (
    <>
        <div className="bg-white">
            <Tab />
        </div>
    </>
  )
}