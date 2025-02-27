import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { getSession } from "next-auth/react"; // 必要に応じて追加

type RankingItem = {
  id: string; // ユーザーIDを追加
  username: string;
  totalScore: number;
  rank: number; // 順位を追加
};

export default function Ranking() {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [currentRank, setCurrentRank] = useState<number | null>(null);

  useEffect(() => {
    async function fetchRankings() {
      const res = await fetch("/api/ranking");
      if (res.ok) {
        const data: RankingItem[] = await res.json();
        setRankings(data);

        // 現在のユーザーセッションを取得
        const session = await getSession();
        const currentUserId = session?.user.id; // セッションからユーザーIDを取得
        const rankIndex = data.findIndex(user => user.id === currentUserId);
        setCurrentRank(rankIndex !== -1 ? data[rankIndex].rank : null);
      } else {
        console.error("Failed to fetch rankings");
      }
    }
    fetchRankings();
  }, []);
  const getCurrentRankColor = (rank: number | null) => {
    if (rank === 1) return "text-[#EDD54B]"; // 金色
    if (rank === 2) return "text-[#A29A9A]"; // 銀色
    if (rank === 3) return "text-[#815a2b]"; // 銅色
    return "text-[#C44747]"; // デフォルトの色
  };

  return (
    <Layout headerImgSrc="/ranking-header.jpg">
      <div className="max-w-full px-12 py-10">
        <div className="bg-white h-[60px] font-kaisei flex justify-evenly gap-3 rounded-lg border-2 border-[#B5D7D3]">
          <p className="mt-4 flex-1 text-end">現在の順位は</p>
          <p className={`text-[28px] mt-1 ${getCurrentRankColor(currentRank)}`}>
            {currentRank !== null ? currentRank : "-"}
          </p>

          <p className="mt-4 flex-1 text-start">位です
            <span className="ml-2 inline-block rotate-[4deg]">! !</span>
            </p>

        </div>

        <ul className="flex mt-10 bg-[#A7DDB6] h-[40px] border-b-4 border-[#92D1E7] rounded-t-lg justify-around opacity-[80%]">
          <li className="text-white font-bold font-kaisei text-lg mt-1">順位</li>
          <li className="text-white font-bold font-kaisei text-lg mt-1">名前</li>
          <li className="text-white font-bold font-kaisei text-lg mt-1">スコア</li>
        </ul>

        <div
          className="max-h-[350px] overflow-y-auto border-b-2 border-x-2 border-[#D3CDCC] rounded-b-lg"
          style={{ height: rankings.length * 50 > 350 ? "350px" : `${rankings.length * 50}px` }}
        >
          {rankings.map((item, index) => (
            <div
              key={item.id} // ユーザーIDをキーにする
              className={`h-[50px] flex items-center justify-between ${
                index % 2 === 0 ? "bg-white" : "bg-gray-200"
              }`}
            >
              <p className="font-kaisei flex-1 text-center">{item.rank}</p>
              <p className="font-kaisei flex-1 text-center truncate">{item.username}</p>
              <p className="font-kaisei flex-1 text-center">{item.totalScore}点</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
