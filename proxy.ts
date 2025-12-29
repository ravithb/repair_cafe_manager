import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function proxy(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // // Define paths that require authentication
  const protectedPaths = ['/repairs', '/settings'];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // // If not logged in and trying to access a protected path, redirect to login
  if (!session && isProtectedPath) {
    console.log(req.url);
    return NextResponse.redirect(new URL('/login?callbackUrl='+encodeURIComponent(req.url), req.url));
  }

  return NextResponse.next();
}

// Config to specify which paths the proxy should run on
export const config = {
  matcher: ['/:path*'],
};