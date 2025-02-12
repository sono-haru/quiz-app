// import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";  // Prisma クライアント
import bcrypt from "bcryptjs";  // bcryptでパスワードをハッシュ化
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "このエンドポイントは POST のみ対応しています。" });
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "全てのフィールドを入力してください。" });
    }

    try {
        // ユーザー名が既に存在するか確認
        const existingUser = await prisma.users.findUnique({
            where: { username },
        });

        if (existingUser) {
            return res.status(409).json({ error: "このユーザーネームは既に使用されています。" });
        }

        // パスワードをハッシュ化
        const hashedPassword = await bcrypt.hash(password, 10);

        // 新しいユーザーをデータベースに保存
        const newUser = await prisma.users.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return res.status(201).json({ message: "ユーザー登録が完了しました！", user: newUser });
    } catch (error) {
        console.error("エラー:", error);
        return res.status(500).json({ error: "サーバーエラーが発生しました。" });
    }
}
