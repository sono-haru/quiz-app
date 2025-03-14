import { Layout } from "@/components/layout";
import Link from "next/link";


export default function TermsOfService(){
    return(
        <Layout headerImgSrc="/terms-header.jpg">
            <div className="max-x-full pt-10 px-10 bg-[#F6F6F6] min-h-screen short:text-[12px] short:pt-5">

                {/* 禁止事項 */}
                <p className="text-red-400 text-2xl pb-3 font-kaisei text-center border-b-[6px] border-white short:text-[16px] short:pb-1 short2:text-[22px] short2:pb-1">- 禁止事項 -</p>
                <p className="text-center mb-3 mt-3 short2:text-[15px]">本サービスでは、以下の行為を禁止します。</p>
                <div className="short:text-[11px] short2:text-[14px]">
                    <div className="flex">
                        <p>1.</p>
                        <p className="ml-1">法令または公序良俗に違反する行為</p>
                    </div>
                    <div className="flex mt-2">
                        <p>2.</p>
                        <p className="ml-1">本サービスの運営を妨害する行為</p>

                    </div>
                    <div className="flex mt-2">
                        <p>3.</p>
                        <p className="ml-1">他のユーザーの情報を不正に取得、または改変する行為</p>
                    </div>

                    {/* 免責事項 */}
                    <p className="text-red-400 text-2xl pb-3 font-kaisei text-center mt-5 border-b-[6px] border-white short:text-[16px] short:pb-1 short:mt-3 short2:text-[22px] short2:pb-1">- 免責事項 -</p>
                    <div className="flex mt-3">
                        <p>1.</p>
                        <p className="ml-1">運営者は、本サービスの利用により生じた損害について、一切の責任を負いません。</p>
                    </div>
                    <div className="flex mt-3">
                        <p>2. </p>
                        <p className="ml-1">ユーザー間または第三者との間に生じた紛争について、運営者は一切関知せず、ユーザー自身の責任で解決するものとします。</p>
                    </div>
                </div>
                <div className="text-center mt-10 drop-shadow-lg short:mt-7">
                    <Link href="/etc" className="bg-blue-400 px-10 rounded-md text-white text-xl py-2.5 short:py-1 short:text-sm short:px-6 short2:text-sm short2:px-9 short2:py-2">
                    戻る
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

{/* <ol className="list-decimal">
                    <li>hello</li>
                    <li>hello2<br />xxxxxx</li>
                </ol>
 */}
