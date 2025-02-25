// pages/api/answer.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    type AnswerRequestBody = {
      userId: string;
      username: string;
      questionId: string;
      correct: boolean; // 回答が正解かどうか
    };

    const { userId, username, questionId, correct }: AnswerRequestBody = req.body;

    // 正解でない場合は何もせずに成功レスポンスを返す（または必要に応じた処理）
    if (!correct) {
      return res.status(200).json({ message: "不正解のため、得点更新は行いません" });
    }

    try {
      // 既にこのユーザーがこの問題で正解した記録があるかをチェック
      const answered = await prisma.answeredQuestions.findUnique({
        where: { userId_questionId: { userId, questionId } },
      });

      if (!answered) {
        // 初めて正解した場合のみ、AnsweredQuestionsにレコードを作成し、
        // ユーザーのtotalScoreを増加させる
        await prisma.answeredQuestions.create({
          data: {
            userId,
            username,
            questionId,
            correct: true,
            firstAnswered: true,
          },
        });

        await prisma.user.update({
          where: { id: userId },
          data: { totalScore: { increment: 20 } },
        });

        return res.status(200).json({ message: "初回正解のため得点が追加されました", firstAnswered: true });
      } else {
        // 既に回答済みの場合は、得点は追加しない
        return res.status(200).json({ message: "既に正解済みのため得点は追加されません", firstAnswered: false });
      }
    } catch (error) {
      console.error("データベースエラー:", error);
      return res.status(500).json({ error: "エラーが発生しました" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
