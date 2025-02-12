import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/router";

const schema = z.object({
    username: z.string().min(3, "ユーザーネームは3文字以上必要です"),
    password: z.string().min(6, "パスワードは6文字以上必要です"),
});

type Schema = z.infer<typeof schema>;

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<Schema>({
        resolver: zodResolver(schema),
    });
    const router = useRouter();

    const onSubmit = async (data: Schema) => {
        const response = await fetch("/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert("ユーザー登録が完了しました！");
            // サインアップ後、ログインページへリダイレクト
            router.push("/login");
        } else {
            alert("登録に失敗しました。");
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center font-kaisei" style={{ backgroundImage: "url(/signup-img.jpg)" }}>
            <form className="bg-[#D9D9D9] bg-opacity-40 p-6 rounded border border-white w-[350px] h-[600px] backdrop-blur-sm" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-[35px] text-center">Sign Up</h1>

                {/* ユーザーネーム */}
                <label htmlFor="username" className="block mt-4 font-semibold text-white">
                    ユーザーネーム
                </label>
                <input
                    type="text"
                    className="rounded-md bg-[#FFFFFF] w-full h-[55px] px-4 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#4AA6D1]"
                    placeholder="ユーザーネームを入力"
                    {...register("username")}
                />
                {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

                {/* パスワード */}
                <label htmlFor="password" className="block mt-4 font-semibold text-white">
                    パスワード
                </label>
                <input
                    type="password"
                    className="rounded-md bg-[#FFFFFF] w-full h-[55px] px-4 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#4AA6D1]"
                    placeholder="パスワードを入力"
                    {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                <div className="flex flex-col items-center">
                    {/* 登録ボタン */}
                    <button type="submit" className="w-[150px] block mt-[40px]">
                        <Image
                            src="/signup-button.jpg"
                            alt="登録ボタン"
                            width={150}
                            height={50}
                            className="rounded-lg border-2 border-white transition-all duration-200 ease-in active:scale-[0.98]"
                        />
                    </button>

                    {/* ログインリンク */}
                    <div className="flex items-center justify-center rounded-lg border-2 border-white bg-[#D9D9D9] opacity-[0.8] w-[185px] h-[35px] mt-[30px]">
                        <Link href="/login" className="text-center text-[16px]">
                            登録済みの方はこちら
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}





// import Image from "next/image";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"

// const schema = z.object({
//     username: z.string(),
//     password: z.string(),
// });

// type Schema = z.infer<typeof schema>

// export default function SignUp() {
//     const { register, handleSubmit } = useForm<Schema>({
//         resolver: zodResolver(schema),
//     })

//     const onSubmit = (data: Schema) => {
//         console.log(data)
//     }

//     return (
//         <div
//             className="min-h-screen bg-cover bg-center flex items-center justify-center font-kaisei"
//             style={{ backgroundImage: "url(/signup-img.jpg)" }}
//         >
//             <form className="bg-[#D9D9D9] bg-opacity-40 p-6 rounded border border-white w-[350px] h-[600px] backdrop-blur-sm" onSubmit={handleSubmit(onSubmit)}>
//                 <h1 className="text-[35px] text-center">Sign Up</h1>

//                 {/* ユーザーネーム */}
//                 <label htmlFor="username" className="block mt-4 font-semibold text-white">
//                     ユーザーネーム
//                 </label>
//                 <input
//                     type="text"
//                     className="rounded-md bg-[#FFFFFF] w-full h-[55px] px-4 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#4AA6D1]"
//                     placeholder="ユーザーネームを入力"
//                     {...register("username")}
//                 />

//                 {/* パスワード */}
//                 <label htmlFor="password" className="block mt-4 font-semibold text-white">
//                     パスワード
//                 </label>
//                 <input
//                     type="password"
//                     className="rounded-md bg-[#FFFFFF] w-full h-[55px] px-4 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#4AA6D1]"
//                     placeholder="パスワードを入力"
//                     {...register("password")}
//                 />

//                 <div className="flex flex-col items-center">
//                     {/* 登録ボタン */}
//                     <button
//                         type="submit"
//                         className="w-[150px] block mt-[40px]"
//                     >
//                         <Image
//                             src="/signup-button.jpg"
//                             alt="登録ボタン"
//                             width={150} // 幅を指定
//                             height={50} // 高さを指定
//                             className="rounded-lg border-2 border-white transition-all duration-200 ease-in active:scale-[0.98]"
//                         />
//                     </button>

//                     {/* ログインリンク */}
//                     <div className="flex items-center justify-center rounded-lg border-2 border-white bg-[#D9D9D9] opacity-[0.8] w-[185px] h-[35px] mt-[30px]">
//                         <Link href="/login" className="text-center text-[16px]">
//                             登録済みの方はこちら
//                         </Link>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// }
