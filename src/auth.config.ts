import { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authConfig = {
    pages: {
        signIn: "/login",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        jwt({ token, user }) {
            // JWTに保存する情報はユーザーIDのみ
            if (user && user.id) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            // JWTからユーザーIDを取得してPrismaからユーザー情報を取得
            if (token?.id) {
                const user = await prisma.user.findUnique({
                    where: { id: String(token.id) },
                    omit: {
                        password: true
                    }
                });

                if (user) {
                    session.user = user as any;
                }
            }

            return session;
        },

        signIn({ user }) {
            if (!user) {
                throw new Error("ログインに失敗しました");
            }
            return true;
        }
    },

    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                username: { label: "ユーザー名", type: "text" },
                password: { label: "パスワード", type: "password" }
            },

            async authorize(credentials) {
                if (
                    !credentials
                    || typeof credentials.username !== "string"
                    || typeof credentials.password !== "string"
                ) {
                    return null;
                    // throw new Error("認証情報が不足しています");
                }

                // ユーザー名でユーザーを検索
                const user = await prisma.user.findFirst({
                    where: { username: credentials.username },
                    select: { id: true, username: true, password: true, createdAt: true, updatedAt: true }
                });

                if (!user) {
                    return null;
                    // throw new Error("ユーザー名またはパスワードが間違っています");
                }

                // パスワードの比較
                const { password, ...userWithoutPassword } = user;
                if (await bcrypt.compare(String(credentials.password), password)) {
                    return userWithoutPassword;
                }

                return null;
                // throw new Error("ユーザー名またはパスワードが間違っています");
            },
        })
    ]
} satisfies NextAuthConfig;
