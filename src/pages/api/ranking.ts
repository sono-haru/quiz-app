import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const rankings = await prisma.user.findMany({
        select: {
          id: true,  // ユーザーIDを追加
          username: true,
          totalScore: true,
        },
        orderBy: {
          totalScore: "desc",
        },
      });

      // 降順に並んだ結果に対して、インデックスから順位を追加する
      const rankedResults = rankings.map((user, index) => ({
        rank: index + 1,
        ...user,
      }));

      return res.status(200).json(rankedResults);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "ランキングの取得に失敗しました" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
