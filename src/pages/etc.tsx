import { Layout } from "@/components/layout";
import Link from "next/link";
import Image from "next/image";



export default function Etc() {
    return (
        <Layout headerImgSrc="/etc-header.jpg">
            <div className="max-w-full font-kaisei pt-10 px-10 text-center bg-[#F6F6F6] min-h-screen short:pt-6">

                <div className="mb-7 short:mb-5">
                    <Link href="/account">
                        <Image
                            src="/account-mini-icon.svg"
                            alt="アカウントアイコン"
                            width={32}
                            height={32}
                            className="absolute mt-3 ml-8 short:w-[22px]"
                        />
                        <p className="text-3xl bg-white h-[60px] rounded-lg pt-3 short:h-[45px] short:text-2xl short:pt-2">アカウント</p>
                    </Link>
                </div>

                <div className="mb-7 short:mb-5">
                    <Link href="/TermsOfService">
                        <Image
                            src="/terms-mini-icon.svg"
                            alt="利用規約アイコン"
                            width={35}
                            height={35}
                            className="absolute mt-3 ml-8 short:w-[22px]"
                        />
                        <p className="text-3xl bg-white h-[60px] rounded-lg pt-3 text-gray-800 short:h-[45px] short:text-2xl short:pt-2">利用規約</p>
                    </Link>
                </div>

                <div className="mb-7 short:mb-5">
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
                            className="absolute mt-4 ml-8 rounded short:w-[22px] short:mt-3"
                        />
                        <p className="text-3xl bg-white h-[60px] rounded-lg pt-3 pl-4 text-gray-800 short:h-[45px] short:text-2xl short:pt-2">ホームページ</p>
                    </a>
                </div>

                <div className="mb-7 short:mb-5">
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
                            className="absolute mt-4 ml-8 opacity-[90%] short:w-[22px] short:mt-3"
                        />
                        <p className="text-3xl bg-white h-[60px] rounded-lg pt-3 text-gray-800 short:h-[45px] short:text-2xl short:pt-1">Instagram</p>
                    </a>
                </div>

                <div className="mb-7">
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
                            className="absolute mt-3 ml-8 opacity-[90%] short:w-[22px] short:mt-2.5"
                        />
                        <p className="text-3xl bg-white h-[60px] rounded-lg pt-3 text-gray-800 short:h-[45px] short:text-2xl short:pt-1">X</p>
                    </a>
                </div>

                <p className="text-center text-md font-kaisei short:text-sm short:-mt-5">© 2025 QuizApp</p>

            </div>

        </Layout>

    );
}
