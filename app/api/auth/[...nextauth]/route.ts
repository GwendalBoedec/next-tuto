import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
 
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        const creds = credentials as { email: string; password: string };
        if (!creds?.email || !creds.password) return null;
       const user = await prisma.user.findUnique({ 
        where: { email: creds.email },
        select: {
          id: true,
          email: true,
          hashedPassword: true,
        },
        });
        if (!user || !user.hashedPassword) return null;
        const passwordMatch = await bcrypt.compare(creds.password, user.hashedPassword!);
        return passwordMatch ? user : null;
      },
    }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
    ],
  session: {
    strategy: "jwt"
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }