import GoogleProvider from "next-auth/providers/google";
import NextAuth, { DefaultSession, Session, User }  from "next-auth";
import { JWT } from "next-auth/jwt";
import { getUserByEmail } from "@/actions/users";

export interface CustomAuthUser extends User {
  roles: string[] | null;
}

declare module 'next-auth' {
  interface Session {
    user?: CustomAuthUser & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: CustomAuthUser;
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID + "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET + "",
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      // 1. Initial sign-in: Fetch roles from your database
      if (token) {
        const dbUser = await getUserByEmail(token.email || "");
        token.roles = dbUser?.roles?.split(",").sort(); // Add role to token
      }
      console.log('token returned ', token);
      return token;
    },
    async session({ session, token }) {
      // 2. Pass role to the client session
      if (session.user) {
        session.user.roles = token.roles as string[] ;
      }
      console.log('session returned ', session);
      return session;
    },
  },
});