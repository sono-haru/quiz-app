import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Layout } from "@/components/layout";
import { useState, useEffect } from "react";

// JSONファイルのインポート
import htmlQuestionsData from "@/quizdata/html-data.json";
import cssQuestionsData from "@/quizdata/css-data.json";
import pythonQuestionsData from "@/quizdata/python-data.json";
import djangoQuestionsData from "@/quizdata/django-data.json";

type Question = {
    question: string;
    answer: boolean;
};

export default function Quiz() {
    // ログイン中のユーザー情報を取得
    const { data: session, status } = useSession();
    const router = useRouter();
    const { slug } = router.query;

    // userのログイン状態の管理
    useEffect(() => {
        // 読み込み中は何もしない
        if (status === "loading") return;

        // ログインしていない場合、ログイン画面にリダイレクト
        if (!session) {
            router.push("/login");
        }
    }, [session, status, router]);

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!slug) return;

        const [subject, level] = (slug as string).split("-");
        const levelNumber = parseInt(level, 10);

        let selectedQuestions: Question[] = [];
        switch (subject.toLowerCase()) {
            case "html":
                selectedQuestions = htmlQuestionsData.find((q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber)?.items || [];
                break;
            case "css":
                selectedQuestions = cssQuestionsData.find((q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber)?.items || [];
                break;
            case "python":
                selectedQuestions = pythonQuestionsData.find((q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber)?.items || [];
                break;
            case "django":
                selectedQuestions = djangoQuestionsData.find((q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber)?.items || [];
                break;
            default:
                break;
        }

        setQuestions(selectedQuestions);
        setCurrentIndex(0);
        setScore(0);
    }, [slug]);

    // 回答処理（ログイン中のユーザーIDを使用）
    const handleAnswer = async (userAnswer: boolean) => {
        if (questions.length === 0) return;
        if (!session?.user?.id) {
            console.error("ユーザーがログインしていません");
            return;
        }

        const isCorrect = questions[currentIndex].answer === userAnswer;
        const userId = session.user.id; // ログイン中のユーザーID
        const questionId = `${slug}-${currentIndex}`;

        if (isCorrect) {
            try {
                // APIエンドポイントにリクエストを送信して、初めて正解した場合のみ totalScore を更新
                const response = await fetch("/api/answer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, username: session.user.username, questionId, correct: true }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.firstAnswered) {
                        console.log("初回正解のため totalScore が更新されました");
                    }
                }
            } catch (error) {
                console.error("エラー:", error);
            }

            setFeedback("正解！🎉");
        } else {
            setFeedback("不正解 😢");
        }

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setFeedback(null);
            } else {
                alert("クイズ終了！お疲れさまでした 🎉");
                setScore(0);
                router.push("/");
            }
        }, 1000);
    };

    if (!questions.length) return <p className="text-center mt-20">問題が見つかりません</p>;

    return (
        <Layout headerImgSrc={`/${slug}.jpg`}>
            <div className="flex flex-col h-full">
                {/* 問題文エリア */}
                <div className="m-8 h-[270px] bg-white rounded-2xl flex flex-col items-center justify-between p-6 text-xl text-center font-semibold border-2 border-[#DBC895]">
                    <span className=" absolute font-kaisei text-[30px] border-b-2 border-dashed">{`Q. ${currentIndex + 1}`}</span>
                    <div className=" relative flex-grow flex items-center justify-center">
                        <span>{questions[currentIndex].question}</span>
                    </div>
                </div>

                {/* 正誤フィードバック */}
                {feedback ? <p className="text-center text-lg font-bold text-red-500">{feedback}</p> : null}

                {/* ボタンエリア */}
                <div className="flex justify-around mt-20">
                    <button onClick={() => handleAnswer(true)}>
                        <Image src="/true-button.jpg" width={110} height={110} alt="マルボタン" className="rounded-2xl" />
                    </button>
                    <button onClick={() => handleAnswer(false)}>
                        <Image src="/false-button.jpg" width={110} height={110} alt="バツボタン" className="rounded-2xl" />
                    </button>
                </div>
            </div>
        </Layout>
    );
}
