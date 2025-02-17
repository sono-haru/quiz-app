import { useState } from 'react';

type QuizItem = {
    question: string;
    answer: boolean;
};

type QuizCategory = {
    subject: string;
    level: number;
    items: QuizItem[];
};

type QuizDisplayProps = {
    quizData: QuizCategory[];
};

export const QuizDisplay = ({ quizData }: QuizDisplayProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const currentQuestion = quizData[0].items[currentQuestionIndex];

    const handleAnswer = (answer: boolean) => {
        if (isAnswered) return;

        setUserAnswer(answer ? '〇' : '×');
        setIsAnswered(true);

        if (answer === currentQuestion.answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        setIsAnswered(false);
        setUserAnswer(null);

        if (currentQuestionIndex + 1 < quizData[0].items.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert(`クイズ終了！あなたのスコアは ${score} 点です。`);
        }
    };

    return (
        <div>
            <h1>{quizData[0].subject} - Level {quizData[0].level}</h1>
            <p>{currentQuestion.question}</p>

            <div>
                <button onClick={() => handleAnswer(true)} disabled={isAnswered}>
                    〇
                </button>
                <button onClick={() => handleAnswer(false)} disabled={isAnswered}>
                    ×
                </button>
            </div>

            {isAnswered ? (
                <div>
                    <p>{userAnswer === (currentQuestion.answer ? '〇' : '×') ? '正解!' : '不正解'}</p>
                    <button onClick={handleNextQuestion}>
                        次の問題
                    </button>
                </div>
            ) : null}
        </div>
    );
};
