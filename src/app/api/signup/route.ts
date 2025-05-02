import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const userSchema = z.object({
    username: z
        .string()
        .min(1, "1文字以上必要です")
        .max(20, "20文字以内で入力してください"),
    password: z.string().min(4, "4文字以上にしてください"),
});

export const POST = async (req: Request) => {
    try {
        const body = await req.json();

        // バリデーション
        const result = userSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ errors: result.error.format() }, { status: 422 });
        }

        const { username, password } = result.data;

        // 既に同じユーザー名が存在するか確認
        const existingUser = await prisma.user.findUnique({ where: { username } });
        if (existingUser) {
            return NextResponse.json({
                errors: {
                    username: "このユーザー名は既に使用されています",
                }
            }, { status: 422 });
        }

        // パスワードをハッシュ化してデータベースに保存
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
            },
        });

        return NextResponse.json({ message: "ユーザー登録が完了しました！", user }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "サーバーエラーが発生しました。" }, { status: 500 });
    }
}
