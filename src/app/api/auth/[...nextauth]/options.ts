import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import argon2 from "argon2";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your email", required: true, oninvalid :"this.setCustomValidity('Email is require')", oninput:"this.setCustomValidity('')"},
        password: { label: "Password", type: "password", placeholder: "your password", required: true, oninvalid :"this.setCustomValidity('Password is require')", oninput:"this.setCustomValidity('')" }
      },
      async authorize(credentials) {
        
        if(!credentials?.email || ! credentials?.password){
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if(!user){
          return null;
        }

        if(!user.password){
          return null
        }

        const passwordMatch = await argon2.verify(user?.password, credentials.password)
        if(!passwordMatch){
          return null
        }

        return user;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }){
      // console.log("jwt callback", {token, user, session})

      if(trigger === "update" && session?.name){
        token.name = session.name
      }

      if(user){
        return {
          ... token,
          id: user.id,
        }
      }

      const newUser = await prisma.user.update({
        where: {
          id: token.id as string,
        },
        data: {
          name: token.name,
        },
      });

      // console.log("newUser", newUser)

      return token;
    },
    async session({ session, token, user}){
      // console.log("session callback", {session, token, user})
      return {
        ... session,
        user : {
          ...session.user,
          name : token.name,
          id: token.id,
        }
      }
    },
  },
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
}
