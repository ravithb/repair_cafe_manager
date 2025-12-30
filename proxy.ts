import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  const session = await auth();

  // // Define paths that require authentication
  const protectedPaths = ['/repairs', '/settings'];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );
  console.log('------------');
  console.log(req.url);
  console.log('is protected', isProtectedPath);
  console.log('session is ', session);

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