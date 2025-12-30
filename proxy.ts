import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from "@/lib/auth";
import { Session } from 'next-auth';

const ACL = [
  {path:'/repairs',   roles: ['ADMIN', 'REPAIRER']},
  {path:'/settings',  roles: ['ADMIN']}
]

function checkAccess(req: NextRequest, session: Session | null){
  let requiresAnyRole: string[] = [];
  for(let i = 0;i < ACL.length; i++){
    if(req.nextUrl.pathname.startsWith(ACL[i].path)){
      requiresAnyRole = ACL[i].roles;
      break;
    }
  }

  const setRoles = new Set(session?.user?.roles);
  const requiredRoles = new Set(requiresAnyRole);
  return setRoles.intersection(requiredRoles).size > 0;

}

export async function proxy(req: NextRequest) {
  const session = await auth();

  // // Define paths that require authentication
  const protectedPaths = ['/repairs', '/settings'];
  const isProtectedPath = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // // If not logged in and trying to access a protected path, redirect to login
  if (!session && isProtectedPath) {
    return NextResponse.redirect(new URL('/login?callbackUrl='+encodeURIComponent(req.url), req.url));
  }

  if(isProtectedPath && checkAccess(req, session) == false){
    return NextResponse.redirect(new URL('/access-denied', req.url));
  }

  return NextResponse.next();
}

// Config to specify which paths the proxy should run on
export const config = {
  matcher: ['/:path*'],
};