import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface RecapPageState {
    username: string;
    score: number;
    totalQuestions: number;
}

const RecapPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as RecapPageState;
    const { username, score, totalQuestions } = state;

    const handleBackToHome = () => {
        navigate('/');
    };

    return (
        <div className='h-screen flex items-center justify-center'>
            <div className='w-full max-w-xl p-8 text-center rounded-lg'>
                <h1 className="font-bold text-4xl text-white mb-4">Quiz Recap</h1>
                <p className="text-xl text-white mb-4">Félicitations, {username}!</p>
                <p className="text-2xl text-white mb-4">Votre score est de {score} / {totalQuestions}.</p>
                <p className="text-lg text-white mb-4">
                    Merci d'avoir participé à notre quiz. Nous espérons que vous avez apprécié l'expérience. 
                </p>
                <button
                    onClick={handleBackToHome}
                    className="w-full bg-[#FFFFFF14] text-white py-3 px-6 rounded"
                >
                    Retour à l'accueil
                </button>
            </div>
        </div>
    );
};

export default RecapPage;
