import Link from "next/link"

export const Subject = ({ subject, subjectColor, subjectSlug1, subjectSlug2, subjectSlug3 }: any) => {
    return (
        <>
            <div className="w-365 mx-10 flex flex-col justify-center items-center">
                <div style={{ backgroundColor: subjectColor }} className="rounded my-[5px] w-full h-[45px] opacity-55 text-center">
                    <p className="text-white text-2xl  pt-[7px] ">
                        <span className="float-left ml-[10px] text-[20px]">＜</span>
                        <span className="float-right mr-[10px] text-[20px]">＞</span>
                        {subject}
                    </p>
                </div>

                <div className="mb-[3px] flex flex-col w-full px-8 pt-3 pb-2 gap-3">
                    <Link href={`/quiz/${subjectSlug1}`} className="block">
                        <div className="bg-[#dfdfdf] rounded px-2 py-2 text-center text-sm">
                            難易度 ★☆☆
                        </div>
                    </Link>
                    <Link href={`/quiz/${subjectSlug2}`}>
                        <div className="bg-[#dfdfdf] rounded px-2 py-2 text-center text-sm">
                            難易度 ★★☆
                        </div>
                    </Link>
                    <Link href={`/quiz/${subjectSlug3}`}>
                        <div className="bg-[#dfdfdf] rounded px-2 py-2 text-center text-sm">
                            難易度 ★★★
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}
