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

// Question 型に correctAnswer を追加
type Question = {
    question: string;
    answer: boolean;
    correctAnswer?: string;
};

export default function Quiz() {
    // ログイン中のユーザー情報を取得
    const { data: session, status } = useSession();
    const router = useRouter();
    const { slug } = router.query;

    // 未ログインの場合はログイン画面へリダイレクト
    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push("/login");
        }
    }, [session, status, router]);

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [_userAnswer, setUserAnswer] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!slug) return;

        const [subject, level] = (slug as string).split("-");
        const levelNumber = parseInt(level, 10);

        let selectedQuestions: Question[] = [];
        switch (subject.toLowerCase()) {
            case "html":
                selectedQuestions = htmlQuestionsData.find(
                    (q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber
                )?.items || [];
                break;
            case "css":
                selectedQuestions = cssQuestionsData.find(
                    (q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber
                )?.items || [];
                break;
            case "python":
                selectedQuestions = pythonQuestionsData.find(
                    (q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber
                )?.items || [];
                break;
            case "django":
                selectedQuestions = djangoQuestionsData.find(
                    (q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber
                )?.items || [];
                break;
            default:
                break;
        }

        setQuestions(selectedQuestions);
        setCurrentIndex(0);
        setScore(0);
        setAnswered(false);
        setIsCorrect(null);
        setUserAnswer(null);
    }, [slug]);

    // 回答処理：回答ボタンをクリックしたときに呼ばれる
    const handleAnswer = async (answer: boolean) => {
        if (questions.length === 0) return;
        if (!session?.user?.id) {
            console.error("ユーザーがログインしていません");
            return;
        }

        const correctAnswerValue = questions[currentIndex].answer;
        const userIsCorrect = correctAnswerValue === answer;

        setIsCorrect(userIsCorrect);
        setUserAnswer(answer);
        setAnswered(true);

        if (userIsCorrect) {
            setScore(prevScore => prevScore + 20);
            try {
                // APIエンドポイントにリクエストを送信（初回正解の場合のみ totalScore を更新）
                const response = await fetch("/api/answer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: session.user.id,
                        username: session.user.username,
                        questionId: `${slug}-${currentIndex}`,
                        correct: true,
                    }),
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
        }
    };

    // 次の問題へ遷移する処理
    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setAnswered(false);
            setIsCorrect(null);
            setUserAnswer(null);
        } else {
            alert("クイズ終了！お疲れさまでした 🎉");
            router.push(`/score?score=${score}&headerImgSrc=/${slug}.jpg`);
        }
    };

    if (!questions.length) return <p className="text-center mt-20">問題が見つかりません</p>;

    return (
        <Layout headerImgSrc={`/${slug}.jpg`}>
            <div className="flex flex-col h-full">
                {/* 問題文エリア */}
                <div className="mx-8 mt-8 mb-4 h-[270px] bg-white rounded-2xl flex flex-col items-center justify-between p-6 text-xl text-center font-semibold border-2 border-[#DBC895]">
                {/* 問題番号 + 画像の配置 */}
                <div className="relative w-full flex justify-center items-center">
                    <p className="font-kaisei text-[30px] short:text-[20px] pb-2 border-b-2 border-dashed border-black">
                        {`Q. ${currentIndex + 1}`}
                    </p>

                    <Image
                        src="/cat.png"
                        width={60}
                        height={60}
                        alt="猫画像"
                        className="absolute left-0 rounded-2xl ml-5 mt-10 short:mb-10"
                    />

                        </div>
                        {/* 質問内容の表示 */}
                        <div className="relative flex-grow flex items-center justify-center short:text-[15px]">
                            <span>{questions[currentIndex].question}</span>
                        </div>
                    </div>


                {!answered ? (
                    // 回答前は解答ボタンを表示
                    <div className="flex justify-around mt-20">
                        <button className="relative" onClick={() => handleAnswer(true)}>
                            <Image
                                src="/true-button.svg"
                                width={110} height={110}
                                alt="マルボタン"
                                className="rounded-2xl short:w-[80px] short:h-[80px] short:mb-4"
                            />
                            <Image
                                src="/dinosaur2.png"
                                width={65}
                                height={65}
                                alt="トリケラ画像"
                                className="absolute rounded-2xl -top-6 rotate-[-24deg] short:-top-8 short:right-6 "
                            />
                        </button>
                        <button className="relative" onClick={() => handleAnswer(false)}>
                            <Image
                                src="/dog.png"
                                width={70}
                                height={70}
                                alt="犬画像"
                                className="absolute rounded-2xl bottom-20 short:-top-10"
                            />
                            <Image
                                src="/false-button.svg"
                                width={110}
                                height={110}
                                alt="バツボタン"
                                className="rounded-2xl short:w-[80px] short:h-[80px] short:mb-4"
                            />
                        </button>
                    </div>
                ) : (
                    // 回答済みの場合はフィードバックと次の問題へのボタンを表示
                    <div className="flex flex-col items-center max-w-full px-10">
                        {isCorrect ? (
                            <p className="text-center text-xl font-bold text-red-400 short:text-[14px]">正解！🎉</p>
                        ) : (
                            <div className="text-center">
                                <p className="text-lg font-bold text-blue-500 text-[14px] short:-my-2">不正解...</p>
                                {/* 不正解の場合、JSONファイルの correctAnswer を表示 */}
                                {!!questions[currentIndex].correctAnswer && (
                                    <div className="relative bg-gray-200 p-4 rounded-md mt-2 border-2 border-blue-200">
                                        <Image
                                            src="/dinosaur.png"
                                            width={60}
                                            height={60}
                                            alt="恐竜画像"
                                            className="absolute right-0 -top-8 rounded-2xl"
                                        />
                                        <p className="text-md mt-2 short:text-[12px]">{questions[currentIndex].correctAnswer}</p>
                                    </div>
                                )}
                            </div>

                        )}
                        <button
                            onClick={handleNextQuestion}
                            className="drop-shadow-lg mt-5 bg-blue-400 px-10 rounded-md text-white text-lg pt-2.5 pb-2.5 short:text-[12px] short:pt-1 short:pb-1 short:mb-4">
                            次の問題へ
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
