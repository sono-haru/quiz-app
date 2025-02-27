import { useRouter } from "next/router";
import { Layout } from "@/components/layout";
import Image from "next/image";

export default function Score() {
    const router = useRouter();
    const { score, headerImgSrc } = router.query;
    // score は文字列として渡されるので数値に変換
    const scoreValue = typeof score === "string" ? parseInt(score, 10) : 0;
    const headerImage = typeof headerImgSrc === "string" ? headerImgSrc : "/default-header.jpg";

    return (
        <Layout headerImgSrc={headerImage}>
            <div className="max-w-full p-10 text-center relative">
                {scoreValue === 100 ? (
                    <div className="font-kaisei bg-white p-8 rounded-lg border-2 border-solid border-[#FFBAAF]">
                        <Image
                            src="/nice.png"
                            width={80}
                            height={80}
                            alt="100点画像"
                            className="rotate-[-8deg] absolute left-0 rounded-2xl ml-6 -mt-14"
                        />
                        <p className="text-2xl mb-2">今回の点数は...</p>
                        <div className="flex text-3xl justify-center">
                            <p className="ml-10 text-red-400">{scoreValue}点</p>
                            <p className="ml-2 mt-2 text-base"> です!!!</p>
                        </div>
                    </div>
                ) : (
                    <div className="font-kaisei bg-white p-8 rounded-lg border-2 border-solid border-blue-300">
                        <Image
                            src="/fail.svg"
                            width={100}
                            height={100}
                            alt="不合格画像"
                            className="rotate-[-8deg] absolute left-5 rounded-2xl mr-6 -mt-20"
                        />
                        <p className="text-2xl mb-2">今回の点数は...</p>
                        <div className="flex text-3xl justify-center">
                            <p className="ml-10 text-blue-400">{scoreValue}点</p>
                            <p className="ml-2 mt-2 text-base"> です</p>
                        </div>
                    </div>
                )}
                <div className="mx-6 mt-6">
                    <p className="text-sm">
                        当アプリをご利用いただきありがとうございました!
                    </p>
                    <p className="text-sm mt-2">
                        ほかの問題にも是非チャレンジしてみてください!
                    </p>
                </div>
                <button
                    onClick={() => router.push("/")}
                    className="mt-6 bg-blue-400 px-4 py-2 rounded-md text-white"
                >
                    ホームに戻る
                </button>
            </div>
        </Layout>
    );
}
