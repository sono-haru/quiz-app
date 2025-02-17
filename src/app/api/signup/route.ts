import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const userSchema = z.object({
    username: z.string().min(3, "ユーザー名は3文字以上にしてください"),
    password: z.string().min(6, "パスワードは6文字以上にしてください"),
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
