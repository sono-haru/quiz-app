// import Link from "next/link";

import { ReactNode } from "react"
import { TabMenu } from "./tabMenu"

type Props = {
    children?: ReactNode;
    headerImgSrc?: string;
    noHeader?: boolean;
}

export const Layout = ({ children, headerImgSrc, noHeader }: Props) => {
    return (
        <div className="relative flex flex-col h-screen max-w-auto">
            {noHeader || (
                <header className="aspect-[44/21] border-b-[6px] border-t-[6px] border-white">
                    <img src={headerImgSrc} className="w-full h-full" />
                    {/* <Link href="/"><span>quiz-app</span></Link> */}
                </header>
            )}
            <main className="relative flex-1 overflow-scroll">{children}</main>
            <TabMenu />
        </div>
    )
}

