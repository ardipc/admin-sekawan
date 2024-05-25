import { supadmin } from '@/libs/supadmin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const supa = supadmin();

export async function GET(request: Request) {
  const { data, error } = await supa.from('facilities').select();
  return NextResponse.json(data);
}
