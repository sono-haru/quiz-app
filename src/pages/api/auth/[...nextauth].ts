import prisma from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";

export const authOptions: AuthOptions = {
    pages: {
        signIn: "/login",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const user = await prisma.users.findFirst({
                    where: {
                        username: credentials?.username
                    }
                });

                if (!user) {
                    return null;
                }

                if (await bcrypt.compare(credentials?.password, user.password)) {
                    return user;
                }

                return null;
            }
        })
    ]
}

export default NextAuth(authOptions);
