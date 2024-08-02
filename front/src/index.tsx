import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import QuizPage from './QuizPage';
import RecapPage from './RecapPage';

ReactDOM.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/recap" element={<RecapPage />} />
        </Routes>
    </Router>,
    document.getElementById('root')
);
