import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const apiPath = "/api"
  const res = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res })

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  const { data: { session} } = await supabase.auth.getSession()

  if(!session || session.user.user_metadata.role !== "Administrator") {
    if(req.nextUrl.pathname.startsWith(apiPath)) {
      return NextResponse.json({ message: "Authorization failed"})
    }
  }

  return res
}

export const config = {
  matcher: [
    "/api/:path*"
  ]
}