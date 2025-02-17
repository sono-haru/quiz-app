import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setError("ユーザーネームとパスワードを入力してください");
            return;
        }

        setError(null);

        // サインイン処理
        const res = await signIn("credentials", {
            username, password,
            redirect: false,
        });

        // エラー処理
        if (res?.error) {
            switch (res.error) {
                case "CredentialsSignin":
                    setError("ユーザーネームまたはパスワードが間違っています");
                    break;
                default:
                    setError(`認証エラーが発生しました (${res.error})`);
                    break;
            }

            return;
        }

        // ログインが成功した場合はトップページにリダイレクト
        if (res?.ok) {
            router.push("/");
            return;
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center font-kaisei"
            style={{ backgroundImage: "url(/login-img.jpg)" }}
        >
            <form
                className="bg-[#D9D9D9] bg-opacity-40 p-6 rounded-2xl shadow-lg border border-white w-[350px] h-[500px] backdrop-blur-sm"
                onSubmit={handleSubmit}
            >
                <h1 className="text-[35px] text-center">Log In</h1>

                {/* ユーザーネーム入力 */}
                <label htmlFor="nickname" className="block mt-4 font-semibold text-white">
                    ユーザーネーム
                </label>
                <input
                    type="text"
                    id="nickname"
                    className="rounded-md bg-[#FFFFFF] text-gray-700 w-full h-[55px] px-4 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#4AA6D1]"
                    placeholder="ユーザーネームを入力"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                {/* パスワード入力 */}
                <label htmlFor="password" className="block mt-4 font-semibold text-white">
                    パスワード
                </label>
                <input
                    type="password"
                    id="password"
                    className="rounded-md bg-[#FFFFFF] text-gray-700 w-full h-[55px] px-4 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#4AA6D1]"
                    placeholder="パスワードを入力"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* エラーメッセージ */}
                {error ? <p className="text-red-500 mt-2">{error}</p> : null}

                <div className="flex flex-col items-center">
                    <button type="submit" className="w-[150px] block mt-[40px]">
                        <img
                            src="/login-button.jpg"
                            alt="ログインボタン"
                            className="w-[150px] rounded-lg border-2 border-white transition-all duration-200 ease-in active:scale-[0.98]"
                        />
                    </button>

                    <div className="flex items-center justify-center rounded-lg border-2 border-white bg-[#D9D9D9] opacity-[0.8] w-[185px] h-[35px] mt-[30px]">
                        <Link href="/signup">
                            <p className="text-center text-[15px]">登録がまだの方はこちら</p>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}





// import Link from "next/link";

// export default function LogIn() {
//     return (
//         <div
//             className="min-h-screen bg-cover bg-center flex items-center justify-center  font-kaisei"
//             style={{ backgroundImage: "url(/login-img.jpg)" }}
//         >
//             <form className="bg-[#D9D9D9] bg-opacity-40 p-6 rounded-2xl shadow-lg border border-white w-[350px] h-[500px] backdrop-blur-sm">

//                 <h1 className="text-[35px] text-center">Log In</h1>
//                 <label htmlFor="nickname" className="block mt-4 font-semibold text-white">
//                     ユーザーネーム
//                 </label>
//                 <input
//                     type="text"
//                     id="nickname"
//                     className="rounded-md bg-[#FFFFFF] w-full h-[55px] px-4 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#4AA6D1]"
//                     placeholder="ユーザーネームを入力"
//                 />

//                 <label htmlFor="password" className="block mt-4 font-semibold text-white">
//                     パスワード
//                 </label>
//                 <input
//                     type="password"
//                     id="password"
//                     className="rounded-md bg-[#FFFFFF] w-full h-[55px] px-4 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#4AA6D1]"
//                     placeholder="パスワードを入力"
//                 />

//                 <div className="flex flex-col items-center">
//                     <button
//                         type="submit"
//                         className="w-[150px] block mt-[40px]">
//                         <img
//                             src="/login-button.jpg"
//                             alt="ログインボタン"
//                             className="w-[150px] rounded-lg border-2 border-white transition-all duration-200 ease-in active:scale-[0.98]"
//                         />
//                     </button>

//                     <div className="flex items-center justify-center rounded-lg border-2 border-white bg-[#D9D9D9] opacity-[0.8] w-[185px] h-[35px] mt-[30px] ">
//                         <Link href="/signup">
//                             <p className="text-center text-[15px]">登録がまだの方はこちら</p>
//                         </Link>
//                     </div>

//                 </div>

//             </form>
//         </div>
//     );
// }
