import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const Github = GithubProvider({
  clientId: process.env.AUTH_GITHUB_ID || "",
  clientSecret: process.env.AUTH_GITHUB_SECRET || "",
});

const Google = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code",
    },
  },
});

export const authOptions: AuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [Github, Google],
  debug: true,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
  },
};

const auth = NextAuth(authOptions);

export default auth;
