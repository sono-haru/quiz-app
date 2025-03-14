// import Link from "next/link";

import { ReactNode } from "react"
import { TabMenu } from "./tabMenu"
import Head from "next/head";

type Props = {
    children?: ReactNode;
    headerImgSrc?: string;
    noHeader?: boolean;
}

export const Layout = ({ children, headerImgSrc, noHeader }: Props) => {
    return (
        <div className="relative flex flex-col h-screen max-w-auto">
            <Head>
                <link rel="icon" href="/quiz-icon.svg" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#ffffff" />
                <title>SonoQuiz</title>
            </Head>
            {noHeader || !headerImgSrc || (
                <header className="aspect-[44/21] border-b-[6px] border-t-[6px] border-white overflow-hidden">
                    <img
                        alt="Header Image"
                        src={headerImgSrc}
                        className="w-full h-full object-cover"
                    />
                </header>
            )}
            <main className="relative flex-1 overflow-y-scroll">{children}</main>
            <TabMenu />
        </div>
    )
}

