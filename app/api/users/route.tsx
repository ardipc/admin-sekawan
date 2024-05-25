import { supadmin } from '@/libs/supadmin'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const supa = supadmin();

export async function GET(request: Request) {
  const { data, error } = await supa.auth.admin.listUsers();
  return NextResponse.json(data);
}
