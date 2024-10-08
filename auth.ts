import NextAuth from "next-auth";
import prisma from "@/prisma/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { AdapterUser } from "next-auth/adapters";
import { createId } from "@paralleldrive/cuid2";
import { compare } from "bcrypt-ts";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async (data: any) => {
      data.id = createId();
      return await prisma.user.create({ data });
    },
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const redirectIfLoggedIn = ["/", "/auth/login", "/auth/register"];
      const isOnProtectedPage = pathname.startsWith("/dashboard");

      if (isLoggedIn && redirectIfLoggedIn.includes(pathname)) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      if (!isLoggedIn && isOnProtectedPage) {
        return Response.redirect(new URL("/auth/login", nextUrl));
      }

      if (!isLoggedIn && !redirectIfLoggedIn.includes(pathname)) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return { id: token.id };
    },
    async session({ session, token }) {
      // session.user.id = token.id as string;
      session.user = { id: token.id as string } as AdapterUser & { id: string };
      return session;
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
        };
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) throw new Error("Invalid Credentials");

          const isPasswordValid = async () => {
            if (user.password) {
              return await compare(
                credentials.password as string,
                user.password
              );
            }
            return false;
          };

          if (!(await isPasswordValid())) {
            throw new Error("Invalid Credentials");
          }

          return user;
        } catch (error) {
          console.error("Authorization error: ", error);
          return null;
        }
      },
    }),
  ],
});
