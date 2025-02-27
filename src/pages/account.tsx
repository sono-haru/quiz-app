import { Layout } from "@/components/layout";
import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Account() {
    const session = useSession();

    // ユーザー情報を読み込み中の処理
    if (session.status === "loading") {
        return (
            <Layout headerImgSrc="/account-header.jpg">
                <div className="h-full flex justify-center items-center bg-black/5">
                    <p className="text-gray-500 text-sm select-none">ユーザー情報を読み込み中…</p>
                </div>
            </Layout>
        )
    }

    // ユーザーが未ログインだった場合の処理
    if (session.status === "unauthenticated" || session.data === null) {
        return (
            <Layout headerImgSrc="/account-header.jpg">
                <div className="max-w-full p-10 bg-[#F6F6F6] min-h-screen">
                    <div className="bg-white rounded-md py-4">
                        <p className="font-kaisei text-center text-md text-red-500">ログインしていないので<br></br>情報を表示できません</p>
                    </div>

                    <div className="text-center mt-8 drop-shadow-lg">
                        <Link href="/signup" className=" border border-white bg-[#A1E9FF] px-9 rounded-md text-white text-xl pt-3 pb-3 opacity-90">
                            サインアップへ
                        </Link>
                    </div>

                    <div className="text-center mt-10 drop-shadow-lg">
                        <Link href="/login" className=" border border-white bg-[#ECE77E] px-14 rounded-md text-white text-xl pt-3 pb-3 opacity-90">
                            ログインへ
                        </Link>
                    </div>
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
        <Layout headerImgSrc="/account-header.jpg">
                <div className="max-w-full p-10 bg-[#F6F6F6] min-h-screen">
                    <div className=" bg-white rounded-lg shadow-sm grid gap-2">
                        <div>
                            <p className="mt-3 text-gray-400 text-sm font-kaisei text-center">ユーザー名</p>
                            <p className="mt-2 text-gray-700 ms-1 text-center">{user.username}</p>
                        </div>
                        <div>
                            <p className="mt-2 text-gray-400 text-sm font-kaisei text-center">登録日</p>
                            <p className="mt-2 mb-3 text-gray-700 ms-1 text-center">{formatDate(user.createdAt) ?? "不明"}</p>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <LogoutButton />
                    </div>
                    <div className="text-center mt-8 drop-shadow-lg">
                    <Link href="/etc" className="border border-white bg-[#97DBF6] px-14 rounded-md text-white text-xl pt-2.5 pb-2.5">
                    戻る
                    </Link>
                </div>
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
    <button className="border border-white drop-shadow-lg bg-[#F68A8A] px-10 rounded-md text-white text-xl pt-2.5 pb-2.5" onClick={handleLogout}>ログアウト</button>
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
