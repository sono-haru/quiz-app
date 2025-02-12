// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        try {
            // ユーザーをデータベースから取得
            const user = await prisma.users.findUnique({
                where: { username },
            });

            if (!user) {
                return res.status(400).json({ message: "ユーザー名またはパスワードが間違っています" });
            }

            // パスワードを比較
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(400).json({ message: "ユーザー名またはパスワードが間違っています" });
            }

            // 認証が成功した場合、セッションやトークンを設定（例: JWTやセッション）

            res.status(200).json({ message: "ログイン成功" });

        } catch (error) {
            console.error("エラー:", error);
            res.status(500).json({ message: "サーバーエラー" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
