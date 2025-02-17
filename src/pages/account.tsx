import { Layout } from "@/components/layout";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Account() {
    const session = useSession();

    // ユーザー情報を読み込み中の処理
    if (session.status === "loading") {
        return (
            <Layout headerImgSrc="/acount-header.jpg">
                <div className="h-full flex justify-center items-center bg-black/5">
                    <p className="text-gray-500 text-sm select-none">ユーザー情報を読み込み中…</p>
                </div>
            </Layout>
        )
    }

    // ユーザーが未ログインだった場合の処理
    if (session.status === "unauthenticated" || session.data === null) {
        return (
            <Layout headerImgSrc="/acount-header.jpg">
                <div className="h-full flex justify-center items-center">
                    <p className="text-red-500 text-sm select-none">ログインしていません</p>
                </div>
            </Layout>
        )
    }

    // ユーザー情報の読み込みが完了した際の処理（メイン処理）
    return <AccountSettings user={session.data.user} />;
}

// アカウント設定画面
function AccountSettings({ user }: { user: User }) {
    return (
        <Layout headerImgSrc="/acount-header.jpg">
            <div className="m-5">
                <div className="px-4 py-2.5 bg-white rounded-lg shadow-sm grid gap-2">
                    <div>
                        <p className="text-gray-400 text-sm font-kaisei">ユーザー名</p>
                        <p className="text-gray-700 ms-1">{user.username}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm font-kaisei">登録日</p>
                        <p className="text-gray-700 ms-1">{formatDate(user.createdAt) ?? "不明"}</p>
                    </div>
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                <LogoutButton />
            </div>
        </Layout>
    );
}


// ログアウトボタン
function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ redirect: false });
        window.alert("ログアウトしました");
        return router.push("/");
    }

    return (
        <button className="bg-[#ef5b5b] hover:bg-[#e15252] px-5 py-2 rounded-lg hover:shadow-sm focus:shadow-md transition" onClick={handleLogout}>ログアウト</button>
    )
}



// Date型をフォーマットした文字列を返す関数
const formatDate = (value?: string | Date) => {
    if (!value) return null;

    try {
        const date = value instanceof Date ? value : new Date(value);
        return date.toLocaleDateString("ja-JP");
    } catch (_: unknown) {
        return null;
    }
}
