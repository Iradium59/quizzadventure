import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchBack from './utils/fetchBack';
import { CategorieProps, Question } from './lib/definition';
import './App.css';

function App() {
    const [history, setHistory] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [username, setUsername] = useState<string>('');
    const [debouncedUsername, setDebouncedUsername] = useState<string>('');
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
    const [categorieList, setCategorieList] = useState<CategorieProps[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [numberOfQuestions, setNumberOfQuestions] = useState<number>(5);

    const navigate = useNavigate();

    useEffect(() => {
        // Lire le nom d'utilisateur depuis le localStorage si disponible
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            setDebouncedUsername(storedUsername);
        }
    }, []);

    useEffect(() => {
        if (debouncedUsername) {
            const fetchData = async () => {
                try {
                    const data = await fetchBack<any[]>(`history/ending/user/${debouncedUsername}`, 'GET');
                    setHistory(data);
                    setError(null);
                } catch (error) {
                    setError('Failed to fetch data');
                    console.error(error);
                }
            };
            fetchData();
        }
    }, [debouncedUsername]);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value;
        setUsername(newUsername);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const timeout = setTimeout(() => {
            setDebouncedUsername(newUsername);
            localStorage.setItem('username', newUsername);
        }, 1000);

        setTypingTimeout(timeout);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchBack<CategorieProps[]>(`categories`, 'GET');
                setCategorieList(data);
            } catch (error) {
                setError('Failed to fetch data');
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const startQuiz = () => {
        if (!username) {
            setError('Username is required');
            return;
        }

        navigate('/quiz', {
            state: {
                username,
                category: selectedCategory ?? 0,
                numberOfQuestions,
            },
        });
    };

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='w-full max-w-xl p-8 text-center'>
                <h1 className="font-bold text-6xl text-white mb-8 font-maintitle">Quizz Adventure</h1>
                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                    className="w-full border rounded p-3 mb-6 bg-main border-[rgba(255,255,255,0.16)] text-white"
                />
                <select
                    className="w-full border rounded p-3 mb-6 bg-main border-[rgba(255,255,255,0.16)] text-white"
                    onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                >
                    <option value={5}>Select the number of questions</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                </select>
                <select
                    className="w-full border rounded p-3 mb-6 bg-main border-[rgba(255,255,255,0.16)] text-white"
                    onChange={(e) => setSelectedCategory(Number(e.target.value))}
                >
                    <option value={0}>Select category (all by default)</option>
                    {categorieList.map((categorie) => (
                        <option key={categorie.id} value={categorie.id}>
                            {categorie.name}
                        </option>
                    ))}
                </select>
                <button
                    className="w-full bg-[#FFFFFF14] text-white py-3 px-6 rounded"
                    onClick={startQuiz}
                >
                    Démarrer le quizz
                </button>

                <div className="mt-8 text-left text-white">
                    <h3 className="text-2xl mb-4">Historique :</h3>
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    {history.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-main border border-gray-700 rounded-md">
                                <thead>
                                    <tr className="bg-gray-800 border-b border-gray-600">
                                        <th className="py-2 px-4 text-left">Date</th>
                                        <th className="py-2 px-4 text-left">Score</th>
                                        <th className="py-2 px-4 text-left">Nombre de questions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item, index) => (
                                        <tr key={index} className="border-b border-gray-600">
                                            <td className="py-2 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                            <td className="py-2 px-4">{item.score}</td>
                                            <td className="py-2 px-4">{item.answered_question_count}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-400">Aucun historique disponible.</p>
                    )}
                </div>

            </div>
        </div>
    );
}

export default App;
