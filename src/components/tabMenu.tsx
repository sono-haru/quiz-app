import Link from "next/link";
import Image from "next/image";

export const TabMenu = () => {
    return (
        <div className="h-[90px] flex gap-16 justify-center items-end bg-[#FEE5E5] border-t-[6px] border-t-white">
            <Link href="/">
                <Image
                    src="/button-home.png"
                    alt="ホームボタン"
                    width={70}
                    height={70}
                    className="mb-[6px] transition-all duration-200 ease-in active:scale-[0.98] short:w-[65px]" />
            </Link>

            <Link href="/ranking">
                <Image
                    src="/button-ranking.png"
                    alt="ランキングボタン"
                    width={70}
                    height={70}
                    className="mb-[8px] transition-all duration-200 ease-in active:scale-[0.98] short:w-[65px]" />
            </Link>

            <Link href="/etc">
                <Image
                    src="/button-etc.png"
                    alt="etcボタン"
                    width={70}
                    height={70}
                    className="mb-[6px] transition-all duration-200 ease-in active:scale-[0.98] short:w-[65px]" />
            </Link>
        </div>
    )
}
