import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials) {
            console.log("No credentials provided");
            return null;
          }

          await connectDB();

          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            console.log("User not found:", credentials.email);
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) {
            console.log("Invalid password for:", credentials.email);
            return null;
          }

          console.log("User authenticated:", user.email, "Role:", user.role);
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = (user as any).id || token.sub;
        token.role = (user as any).role || "user";
      }
      return token;
    },
    async session({ session, token }: any) {
      (session as any).user.id = token.id;
      (session as any).user.role = token.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
