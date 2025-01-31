import { useRouter } from "next/router"
import Image from "next/image";
import { Layout } from "@/components/layout";


export default function Quiz() {
    const router = useRouter()
    const { slug } = router.query;

    return (
        <Layout headerImgSrc={`/${slug}.jpg`}>
            <div className="flex flex-col h-full">
                <div className="m-8 h-[270px] bg-[#E9E9E9] rounded-2xl">
                    {/* 問題文 */}
                </div>

                <div className="flex justify-around">
                    <button>
                        <Image src="/true-button.jpg"
                            width={110}
                            height={110}
                            alt="マルボタン"
                            className="rounded-2xl"
                        />
                    </button>

                    <button>
                        <Image src="/false-button.jpg"
                            width={110}
                            height={110}
                            alt="バツボタン"
                            className="rounded-2xl"
                        />
                    </button>
                </div>
            </div>

        </Layout>
    )
}
