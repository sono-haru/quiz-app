import { Layout } from "@/components/layout"
import { useSession } from "next-auth/react";

// next-authのサンプルコード
const Page = () => {
    const session = useSession();

    // ログイン中の処理
    if (session.status === "loading") {
        return (
            <Layout>
                <p>読み込み中...</p>
            </Layout>
        )
    }

    // 未ログインの処理
    if (session.status === "unauthenticated" || !session.data) {
        return (
            <Layout>
                <p>ログインしてください</p>
            </Layout>
        )
    }

    // 認証情報が取得できた後の処理
    return (
        <Layout>
            Hello {session.data.user.username}!!
        </Layout>
    )
}

export default Page;
