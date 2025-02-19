import { Layout } from "@/components/layout";

export default function Ranking() {
    return (
        <Layout headerImgSrc="/ranking-header.jpg">
            <div className="max-w-full px-12 py-10">
                <div className="bg-white h-[60px] font-kaisei flex justify-evenly gap-3 rounded-lg border-2 border-[#B5D7D3]">
                    <p className="mt-4 flex-1 text-end">現在の順位は</p>
                    <p className="text-[30px] text-[#C44747]">1</p>
                    <p className="mt-4 flex-1 text-start">位です!!</p>
                </div>


                <ul className="flex mt-10 bg-[#A7DDB6] h-[40px]  border-b-4 border-[#92D1E7] rounded-t-lg justify-around opacity-[80%]">
                    <li className="text-white font-bold font-kaisei text-lg mt-1">順位</li>
                    <li className="text-white font-bold font-kaisei text-lg mt-1">名前</li>
                    <li className="text-white font-bold font-kaisei text-lg mt-1">スコア</li>
                </ul>

                <div className=" h-[350px] overflow-y-auto border-b-2 border-x-2 border-[#D3CDCC] rounded-b-lg">
                    {[...Array(10)].map((_, index) => (
                        <div
                            key={index}
                            className={`h-[50px] ${index % 2 === 0 ? "bg-white" : "bg-gray-200"}`}
                        ></div>
                    ))}
                </div>



            </div>
        </Layout>
    );
}
