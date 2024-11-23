import type { NextRequest } from 'next/server'

import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggfedIn = request.cookies.get('isLoggedIn')?.value

  if (isLoggfedIn === 'false') {
    const url = request.nextUrl.clone()

    url.pathname = '/sign-in'

    return NextResponse.redirect(url)
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/profile/settings/:path*'],
}
