import { useRouter } from "next/router";
import Image from "next/image";
import { Layout } from "@/components/layout";
import { useState, useEffect } from "react";

// JSONファイルをインポート
import htmlQuestionsData from "@/quizdata/html-data.json";
import cssQuestionsData from "@/quizdata/css-data.json";
import pythonQuestionsData from "@/quizdata/python-data.json";
import djangoQuestionsData from "@/quizdata/django-data.json";

type Question = {
    question: string;
    answer: boolean;
};

// クイズコンポーネント
export default function Quiz() {
    const router = useRouter();
    const { slug } = router.query;

    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [score, setScore] = useState(0); // ユーザーの点数

    useEffect(() => {
        if (!slug) return;

        // `slug` を `subject` と `level` に分割（例: `html-1` → `html`, `1`）
        const [subject, level] = (slug as string).split("-");
        const levelNumber = parseInt(level, 10);

        // 科目に応じたデータを選択
        let selectedQuestions: Question[] = [];
        switch (subject.toLowerCase()) {
        case "html":
            selectedQuestions = htmlQuestionsData
                .find((q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber)
                ?.items || [];
            break;
        case "css":
            selectedQuestions = cssQuestionsData
                .find((q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber)
                ?.items || [];
            break;
        case "python":
            selectedQuestions = pythonQuestionsData
                .find((q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber)
                ?.items || [];
            break;
        case "django":
            selectedQuestions = djangoQuestionsData
                .find((q) => q.subject.toLowerCase() === subject.toLowerCase() && q.level === levelNumber)
                ?.items || [];
            break;
        default:
            break;
        }

        setQuestions(selectedQuestions);
        setCurrentIndex(0); // 初期化
        setScore(0); // 点数初期化
    }, [slug]);

    // 回答処理
    const handleAnswer = (userAnswer: boolean) => {
        if (questions.length === 0) return;

        const isCorrect = questions[currentIndex].answer === userAnswer;
        if (isCorrect) {
            setScore(prevScore => prevScore + 20); // 正解なら20点追加
        }
        setFeedback(isCorrect ? "正解！🎉" : "不正解 😢");

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setFeedback(null);
            } else {
                alert("クイズ終了！お疲れさまでした 🎉");
                router.push("/"); // ホームへ戻る（必要に応じて変更）
            }
        }, 1000);
    };

    if (!questions.length) return <p className="text-center mt-20">問題が見つかりません</p>;

    return (
        <Layout headerImgSrc={`/${slug}.jpg`}>
            <div className="flex flex-col h-full">

                {/* 問題文エリア */}
                <div className="m-8 h-[270px] bg-white rounded-2xl flex flex-col items-center justify-between p-6 text-xl text-center font-semibold border-2 border-[#DBC895]">
                    <span className="font-kaisei text-[25px]">{`Q. ${currentIndex + 1}`}</span>
                    <div className="flex-grow flex items-center justify-center">
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

                {/* 100点達成時の画像表示 */}
                {score === 100 && (
                    <div className="text-center mt-8">
                        <Image src="/congratulations-image.jpg" width={300} height={300} alt="おめでとう画像" className="rounded-2xl" />
                        <p className="text-xl font-semibold mt-4">100点達成！おめでとう！🎉</p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
