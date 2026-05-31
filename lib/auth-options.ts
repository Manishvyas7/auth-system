import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AzureADProvider from "next-auth/providers/azure-ad";
import { sendWelcomeEmail } from "@/lib/email";

import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
  async signIn({ user, account }) {
    if (!user.email) {
      return false;
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    // First OAuth signup
    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: user.email,
          name: user.name,
          provider: account?.provider ?? "oauth",
        },
      });

      // Send welcome email only once
      sendWelcomeEmail(
        user.email,
        user.name || "User"
      ).catch(console.error);
    }

    return true;
  },

  async jwt({ token }) {
    return token;
  },

  async session({ session }) {
    return session;
  },

  async redirect({ url, baseUrl }) {
    return `${baseUrl}/dashboard`;
  },
},

  secret: process.env.NEXTAUTH_SECRET,
};