import { Layout } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";



export default function Etc() {
    return (
        <Layout headerImgSrc="/etc-header.jpg">
            <div className="max-w-full font-kaisei pt-10 px-10 text-center bg-[#F6F6F6] min-h-screen">

                <div className="pb-7">
                    <Link href="/TermsOfService">
                        <Image
                            src="/terms-mini-icon.svg"
                            alt="利用規約アイコン"
                            width={35}
                            height={35}
                            className="absolute mt-3 ml-8"
                        />
                        <p className="text-3xl bg-white h-[60px] rounded-lg pt-3 text-gray-800">利用規約</p>
                    </Link>
                </div>

                <div className="pb-7">
                    <a
                        href="https://www.o-hara.ac.jp/senmon/school/mito_it/?"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Image
                            src="/ohara-mini-icon.svg"
                            alt="大原アイコン"
                            width={32}
                            height={32}
                            className="absolute mt-4 ml-8 rounded"
                        />
                        <p className="text-3xl bg-white h-[60px] rounded-lg pt-3 text-gray-800">ホームページ</p>
                    </a>
                </div>

                <div className="pb-7">
                    <a
                        href="https://www.instagram.com/mito_infotec/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Image
                            src="/instagram-mini-icon.svg"
                            alt="instagramアイコン"
                            width={32}
                            height={32}
                            className="absolute mt-4 ml-8 opacity-[90%]"
                        />
                        <p className="text-3xl bg-white h-[60px] rounded-lg pt-3 text-gray-800">instagram</p>
                    </a>
                </div>

                <div className="pb-7">
                    <a
                        href="https://www.o-hara.ac.jp/senmon/school/mito_it/?"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                    >
                        <Image
                            src="/x-mini-icon.svg"
                            alt="Xアイコン"
                            width={32}
                            height={32}
                            className="absolute mt-3 ml-8 opacity-[90%]"
                        />
                        <p className="text-3xl bg-white h-[60px] rounded-lg pt-3 text-gray-800">X</p>
                    </a>
                </div>

                <div className="pb-7">
                    <Link href="/">
                        <Image
                            src="/Vector.png"
                            alt="ログアウトアイコン"
                            width={23}
                            height={23}
                            className="absolute mt-3 ml-10"
                        />
                        <p className="text-3xl bg-[#F68A8A] h-[60px] rounded-lg pt-3 text-white">ログアウト</p>
                    </Link>
                </div>

                <p className="text-center text-md font-kaisei">© 2025 QuizApp</p>

            </div>

        </Layout>

    );
}
