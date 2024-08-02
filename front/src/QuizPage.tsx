import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fetchBack from './utils/fetchBack';
import { Question, Answer, QuizPageState } from './lib/definition';

const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const QuizPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as QuizPageState;
    const { username, category, numberOfQuestions } = state;
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [responseStatus, setResponseStatus] = useState<(boolean | null)[]>([]);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {

        const fetchQuestions = async () => {
            try {
                const selectedCategory = category ?? 0;
                const questionsData = selectedCategory === 0
                    ? await fetchBack<Question[]>(`questions/limit/${numberOfQuestions}`, 'GET')
                    : await fetchBack<Question[]>(`questions/category/${selectedCategory}/limit/${numberOfQuestions}`, 'GET');

                setQuestions(questionsData);
                setCurrentQuestionIndex(0);
                fetchAnswers(questionsData[0].id);
                setError(null);
            } catch (error) {
                setError('Failed to fetch questions');
                console.error(error);
            }
        };

        fetchQuestions();
    }, [numberOfQuestions, category]);

    const fetchAnswers = async (questionId: number) => {
        try {
            const answersData = await fetchBack<Answer[]>(`answers/question/${questionId}`, 'GET');
            setAnswers(shuffleArray(answersData));
        } catch (error) {
            setError('Failed to fetch answers');
            console.error(error);
        }
    };

    const handleAnswerSelection = async (answerId: number) => {
        setSelectedAnswer(answerId);
        const isCorrectAnswer = answers.find(answer => answer.id === answerId)?.isCorrect;
        setIsCorrect(isCorrectAnswer ?? false);
        setResponseStatus(prevState => {
            const newStatus = [...prevState];
            newStatus[currentQuestionIndex] = isCorrectAnswer ?? false;
            return newStatus;
        });
 
        if (isCorrectAnswer) {
            setScore(prevScore => prevScore + 1);
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
 
        await handleNextQuestion();
    };
 
    const handleNextQuestion = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            const nextQuestionIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextQuestionIndex);
            await fetchAnswers(questions[nextQuestionIndex].id);
            setSelectedAnswer(null);
            setIsCorrect(null);
        } else {
            await saveHistoryAndRedirect();
        }
    };
 
    const saveHistoryAndRedirect = async () => {
        try {
            await fetchBack('history', 'POST', {
                user: username,
                score: score,
                answered_question_count: questions.length,
                questions: questions.length,
                state: 'ENDING'
            });

            navigate('/recap', {
                state: {
                    username: username,
                    score: score,
                    totalQuestions: questions.length
                }
            });

        } catch (error) {
            setError('Failed to save history');
            console.error(error);
        }


    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='w-full max-w-xl p-8 text-center'>
                <h1 className="font-bold text-6xl text-white mb-8 font-maintitle">Quiz Time</h1>
                <div className="flex justify-center mb-4">
                    {questions.map((_, index) => (
                        <div
                            key={index}
                            className={`w-8 h-8 flex items-center justify-center rounded-full mx-1 text-white ${
                                responseStatus[index] === true
                                    ? 'bg-green-500'
                                    : responseStatus[index] === false
                                    ? 'bg-red-500'
                                    : 'bg-gray-500'
                            }`}
                        >
                            {index + 1}
                        </div>
                    ))}
                </div>
                {questions.length > 0 ? (
                    <div>
                        <h3 className="text-2xl mb-4 text-white">Question {currentQuestionIndex + 1}:</h3>
                        <p className='text-white'>{currentQuestion?.question}</p>
                        {answers.map((answer) => (
                            <div key={answer.id}>
                                <button
                                    className={`w-full border rounded p-3 mb-2 ${
                                        selectedAnswer === answer.id ? 'bg-blue-500' : 'bg-gray-500'
                                    } text-white`}
                                    onClick={() => handleAnswerSelection(answer.id)}
                                    disabled={selectedAnswer !== null}
                                >
                                    {answer.answer}
                                </button>
                            </div>
                        ))}
                        {selectedAnswer && (
                            <div>
                                {isCorrect ? (
                                    <p className="text-green-500">Correct!</p>
                                ) : (
                                    <p className="text-red-500">Incorrect!</p>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Loading questions...</p>
                )}
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </div>
    );
};

export default QuizPage;
