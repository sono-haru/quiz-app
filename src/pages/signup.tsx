import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/router";

const schema = z.object({
    username: z.string().min(3, "ユーザーネームは3文字以上必要です"),
    password: z.string().min(4, "パスワードは4文字以上必要です"),
    passwordConfirmation: z.string().min(1, "パスワードを再入力してください")
}).superRefine((data, ctx) => {
    // パスワードとパスワード（再入力）が一致しているか確認
    if (data.password !== data.passwordConfirmation) {
        ctx.addIssue({
          path: ["passwordConfirmation"],
          code: "custom",
          message: "パスワードが一致しません",
        });
    }
});

type Schema = z.infer<typeof schema>;

// フォームのラベルと入力タイプを定義（mapで回せるように）
const schemaLabels: { [K in keyof Schema]: string } = {
    username: "ユーザーネーム",
    password: "パスワード",
    passwordConfirmation: "パスワード（再入力）"
}
const schemaInputTypes: { [K in keyof Schema]: string } = {
    username: "text",
    password: "password",
    passwordConfirmation: "password"
}

export default function SignUp() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm<Schema>({
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
            if (response.status === 422) {
                if (response.body) {
                    const { errors } = await response.json();
                    for (const key in errors) {
                        setError(key as keyof Schema, { message: errors[key] });
                    }
                }
            } else {
                alert("登録に失敗しました。");
            }
        }
    };

    return (
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center font-kaisei" style={{ backgroundImage: "url(/signup-img.jpg)" }}>
            <form className="bg-[#D9D9D9] bg-opacity-40 p-6 rounded border border-white w-[350px] h-[600px] overflow-y-auto backdrop-blur-sm" onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-[35px] text-center">Sign Up</h1>

                {Object.keys(schemaLabels).map((key) => (
                    <div key={key}>
                        <label htmlFor={key} className="block mt-4 font-semibold text-white">
                            {schemaLabels[key as keyof Schema]}
                        </label>
                        <input
                            type={schemaInputTypes[key as keyof Schema]}
                            className="rounded-md bg-[#FFFFFF] text-gray-700 w-full h-[55px] px-4 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-[#4AA6D1]"
                            placeholder={`${schemaLabels[key as keyof Schema]}を入力`}
                            {...register(key as keyof Schema)}
                        />
                        {errors[key as keyof Schema] ? <p className="text-red-500 text-sm">{errors[key as keyof Schema]?.message}</p> : null}
                    </div>
                ))}

                <div className="flex flex-col items-center">
                    {/* 登録ボタン */}
                    <button type="submit" className="w-[150px] block mt-[40px]">
                        <Image
                            src="/signup-button.jpg"
                            alt="登録ボタン"
                            width={150}
                            height={50}
                            className="drop-shadow-lg rounded-lg border-2 border-white transition-all duration-200 ease-in active:scale-[0.98]"
                        />
                    </button>

                    {/* ログインリンク */}
                    <div className="flex items-center justify-center rounded-lg border-2 border-white bg-[#D9D9D9] opacity-[0.8] w-[185px] h-[35px] mt-[30px]">
                        <Link href="/login" className="drop-shadow-lg text-center text-[16px]">
                            登録済みの方はこちら
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}
