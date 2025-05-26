import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],
  events: {
    async signIn({ user }) {
      const email = user.email;

      //Do some kind of database call with the user email here.
    },
  },
  pages: {
    signIn: "/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
