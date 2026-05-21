import React, { useState, useEffect } from 'react';
import './Quiz.css';
import api from '../api';
import { getAuthItem } from '../authStorage';

const Quiz = () => {
  // State for data, loading, and error
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'levelComplete', 'gameFinished'
  const [selectedOption, setSelectedOption] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState([0]);

  // Fetch all quiz levels from backend
  useEffect(() => {
    const fetchAllLevels = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // NOTE: This loop tries to fetch levels 1 through 10.
        // Ensure your backend has these IDs, or change the loop range.
        const requests = [];
        for (let i = 1; i <= 10; i++) {
          requests.push(api.get(`/quiz/${i}`));
        }

        const responses = await Promise.all(requests);
        const data = responses.map(res => res.data);

        setQuizData(data);
      } catch (err) {
        console.error("Failed to load quiz data", err);
        setError("Failed to load quiz. Please check your connection or backend server.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllLevels();
  }, []);

  // Get current question data safely
  const currentLevel = quizData[currentLevelIndex];
  const currentQuestion = currentLevel?.questions?.[currentQuestionIndex];

  // 1. HANDLE LOADING & ERROR STATES
  if (isLoading) {
    return (
      <div className="quiz-page">
        <div className="quiz-bg-layer">
          <div className="quiz-bg-img"></div>
          <div className="quiz-bg-gradient"></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20%', color: 'white' }}>
          <h2>Loading Quiz...</h2>
        </div>
      </div>
    );
  }

  // 2. HANDLE API FAILURE
  if (error) {
    return (
      <div className="quiz-page">
        <div className="quiz-bg-layer">
          <div className="quiz-bg-img"></div>
          <div className="quiz-bg-gradient"></div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20%', color: '#ff6b6b' }}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Logic: Handle answer click
  const handleOptionClick = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    const isCorrect = index === currentQuestion.correct;
    if (isCorrect) setScore(prev => prev + 1);

    setTimeout(() => {
      setSelectedOption(null);
      if (currentQuestionIndex + 1 < currentLevel.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setGameState('levelComplete');
      }
    }, 1000);
  };

  // Logic: Starts a specific level
  const startLevel = (index) => {
    setCurrentLevelIndex(index);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameState('playing');
  };

  // Logic: Handles proceeding to next level or retrying
  const handleNextOrRetry = () => {
    const passed = score >= 2;

    if (passed) {
      try {
        const token = getAuthItem('token');
        if (!token) return;
        const payload = JSON.parse(atob(token.split('.')[1]));
        const userId = payload?.user?._id || payload?.user?.id;
        api.post('/profile/add-activity', {
          userId,
          action: `Completed quiz: ${currentLevel?.title || 'Level ' + (currentLevelIndex + 1)}`
        }).catch(() => { });
      } catch (e) { }
    }

    if (passed) {
      const nextLevelIdx = currentLevelIndex + 1;
      if (nextLevelIdx < quizData.length) {
        if (!unlockedLevels.includes(nextLevelIdx)) {
          setUnlockedLevels([...unlockedLevels, nextLevelIdx]);
        }
        startLevel(nextLevelIdx);
      } else {
        setGameState('gameFinished');
      }
    } else {
      startLevel(currentLevelIndex);
    }
  };


  return (
    <div className="quiz-page">
      <div className="quiz-bg-layer">
        <div className="quiz-bg-img"></div>
        <div className="quiz-bg-gradient"></div>
      </div>

      {/* --- MENU STATE --- */}
      {gameState === 'menu' && (
        <section className="quiz-menu">
          <div className="quiz-header">
            <h1 className="quiz-title">Test Your <span className="txt-grad">Knowledge</span></h1>
            <p className="quiz-sub">Complete all 10 levels to prove you are a true gamer.</p>
          </div>

          <div className="levels-grid">
            {quizData.map((level, index) => (
              <div
                key={level._id || index}
                className={`level-card ${unlockedLevels.includes(index) ? 'unlocked' : 'locked'}`}
                onClick={() => unlockedLevels.includes(index) && startLevel(index)}
              >
                <div className="card-glow"></div>
                <div className="card-content">
                  <div className="level-icon">
                    {unlockedLevels.includes(index) ? index + 1 : '🔒'}
                  </div>
                  <h3>{level.title}</h3>
                  <span className="diff-tag">{level.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* --- PLAYING STATE --- */}
      {gameState === 'playing' && currentQuestion && (
        <section className="quiz-game">
          <div className="game-hud">
            <div className="hud-item">
              <span>Level {currentLevelIndex + 1}</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentQuestionIndex + 1) / currentLevel.questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="hud-item">
              <span>{currentQuestionIndex + 1}/{currentLevel.questions.length}</span>
            </div>
          </div>

          <div className="question-container">
            <div className="question-box">
              <h2 className="question-text">{currentQuestion.question}</h2>
            </div>

            <div className="options-grid">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedOption === index
                    ? (index === currentQuestion.correct ? 'correct' : 'wrong')
                    : ''
                    }`}
                  onClick={() => handleOptionClick(index)}
                  disabled={selectedOption !== null}
                >
                  <span className="option-key">{String.fromCharCode(65 + index)}</span>
                  <span className="option-text">{option}</span>
                  <div className="btn-glow"></div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- LEVEL COMPLETE STATE --- */}
      {gameState === 'levelComplete' && (
        <section className="result-section">
          <div className="result-card">
            <div className="result-header">
              {score >= 2 ? (
                <>
                  <h2>Level Cleared!</h2>
                  <p>You have proven your skills.</p>
                </>
              ) : (
                <>
                  <h2>Level Failed</h2>
                  <p>You need 2 correct answers to pass.</p>
                </>
              )}
            </div>

            <div className="score-display">
              <div className="score-ring">
                <svg viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" className="bg-circle" />
                  <circle cx="50" cy="50" r="45" className="progress-circle" strokeDasharray={`${(score / 3) * 283} 283`} />
                </svg>
                <div className="score-text">
                  <span className="score-val">{score}</span>
                  <span className="score-total">/ 3</span>
                </div>
              </div>
            </div>

            <div className="result-actions">
              {score >= 2 ? (
                <button className="action-btn primary" onClick={handleNextOrRetry}>
                  {currentLevelIndex + 1 >= quizData.length ? 'Finish Game' : 'Next Level'}
                </button>
              ) : (
                <button className="action-btn secondary" onClick={handleNextOrRetry}>
                  Try Again
                </button>
              )}

              <button className="action-btn outline" onClick={() => setGameState('menu')}>
                Back to Menu
              </button>
            </div>
          </div>
        </section>
      )}

      {/* --- GAME FINISHED --- */}
      {gameState === 'gameFinished' && (
        <section className="result-section">
          <div className="result-card champion">
            <div className="champion-trophy">🏆</div>
            <h2>Champion!</h2>
            <p>You conquered all levels!</p>
            <div className="result-actions">
              <button className="action-btn primary" onClick={() => { setGameState('menu'); setUnlockedLevels([0]); }}>Play Again</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Quiz;