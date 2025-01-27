import { useState } from 'react';
import './App.css';
import { quizData, topics, historyTopics } from './quizData';

function App() {
  const [gameState, setGameState] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  const handleTopicSelection = (topicId) => {
    setCurrentTopic(
      topicId === 1 ? 'capitals' :
      topicId === 2 ? 'flags' :
      topicId === 3 ? 'foods' :
      topicId === 4 ? 'currencies' : null
    );
    setGameState('quiz');
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleHistoryTopicSelection = (topicId) => {
    setCurrentTopic(
      topicId === 1 ? 'worldWars' :
      topicId === 2 ? 'leaders' :
      topicId === 3 ? 'inventions' :
      topicId === 4 ? 'events' : null
    );
    setGameState('quiz');
    setCurrentQuestion(0);
    setScore(0);
  };

  const handleLevelComplete = () => {
    return (
      <div className="quiz-container">
        <h2>כל הכבוד! סיימת את רמה {currentLevel}</h2>
        <p>הציון שלך: {score} מתוך {getCurrentQuestions().length}</p>
        <div className="level-complete-buttons">
          {currentLevel === 1 && (
            <button 
              className="next-level-button"
              onClick={() => {
                setCurrentLevel(2);
                setCurrentQuestion(0);
                setScore(0);
                setSelectedAnswer(null);
                setIsChecking(false);
                setGameState('quiz');
              }}
            >
              המשך לרמה 2
            </button>
          )}
          <button 
            className="topics-button"
            onClick={() => {
              if (currentTopic === 'worldWars' || currentTopic === 'leaders' || 
                  currentTopic === 'inventions' || currentTopic === 'events') {
                setGameState('historyTopics');
              } else {
                setGameState('topics');
              }
              setCurrentLevel(1);
              setCurrentQuestion(0);
              setScore(0);
              setSelectedAnswer(null);
              setIsChecking(false);
            }}
          >
            חזור לבחירת נושא
          </button>
        </div>
      </div>
    );
  };

  const getCurrentQuestions = () => {
    if (!currentTopic) return [];
    
    // אם זה נושא היסטוריה
    if (currentTopic === 'worldWars' || currentTopic === 'leaders' || 
        currentTopic === 'inventions' || currentTopic === 'events') {
      return quizData.history[currentTopic][currentLevel] || [];
    }
    
    // אם זה נושא של מדינות
    return quizData.countries[currentTopic][currentLevel] || [];
  };

  const handleAnswerClick = (selected) => {
    if (isChecking) return;
    
    setIsChecking(true);
    setSelectedAnswer(selected);
    
    const isCorrect = selected === getCurrentQuestions()[currentQuestion].correctAnswer;
    
    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
      }
      
      setTimeout(() => {
        if (currentQuestion < getCurrentQuestions().length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsChecking(false);
        } else {
          setGameState('finished');
        }
      }, 1000);
    }, 500);
  };

  const renderContent = () => {
    switch (gameState) {
      case 'welcome':
        return (
          <div className="quiz-container">
            <p>בחר נושא לשאלון</p>
            <div className="welcome-buttons">
              <button 
                className="start-button"
                onClick={() => setGameState('topics')}
              >
                מדינות🌍
              </button>
              <button 
                className="start-button"
                onClick={() => setGameState('historyTopics')}
              >
                היסטוריה📚
              </button>
            </div>
          </div>
        );
      
      case 'topics':
        return (
          <div className="quiz-container">
            <h2>בחר נושא</h2>
            <div className="topics-grid">
              {topics.map(topic => (
                <button 
                  key={topic.id} 
                  className="topic-button"
                  onClick={() => handleTopicSelection(topic.id)}
                >
                  <span className="topic-icon">{topic.icon}</span>
                  <span>{topic.name}</span>
                </button>
              ))}
            </div>
            <button 
              className="back-button"
              onClick={() => setGameState('welcome')}
            >
              חזרה
            </button>
          </div>
        );
      
      case 'historyTopics':
        return (
          <div className="quiz-container">
            <h2>בחר נושא היסטורי</h2>
            <div className="topics-grid">
              {historyTopics.map(topic => (
                <button 
                  key={topic.id} 
                  className="topic-button"
                  onClick={() => handleHistoryTopicSelection(topic.id)}
                >
                  <span className="topic-icon">{topic.icon}</span>
                  <span>{topic.name}</span>
                </button>
              ))}
            </div>
            <button 
              className="back-button"
              onClick={() => setGameState('welcome')}
            >
              חזרה
            </button>
          </div>
        );
      
      case 'quiz':
        const questions = getCurrentQuestions();
        return (
          <div className="quiz-container">
            <div className="quiz-header">
              <div className="level-indicator">רמה {currentLevel}</div>
              <div className="question-counter">שאלה {currentQuestion + 1} מתוך {questions.length}</div>
              <button 
                className="exit-button"
                onClick={() => {
                  if (currentTopic === 'worldWars' || currentTopic === 'leaders' || 
                      currentTopic === 'inventions' || currentTopic === 'events') {
                    setGameState('historyTopics');
                  } else {
                    setGameState('topics');
                  }
                  setCurrentLevel(1);
                  setCurrentQuestion(0);
                  setScore(0);
                  setSelectedAnswer(null);
                  setIsChecking(false);
                }}
              >
                יציאה
              </button>
            </div>
            <h2>{questions[currentQuestion].question}</h2>
            <div className="options-grid">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    selectedAnswer === option 
                      ? option === questions[currentQuestion].correctAnswer
                        ? 'correct'
                        : 'wrong'
                      : ''
                  } ${isChecking ? 'disabled' : ''}`}
                  onClick={() => handleAnswerClick(option)}
                  disabled={isChecking}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'finished':
        return handleLevelComplete();
        
      default:
        return (
          <div className="quiz-container">
            <p>מצב לא ידוע</p>
            <button 
              className="back-button"
              onClick={() => setGameState('welcome')}
            >
              חזרה למסך הראשי
            </button>
          </div>
        );
    }
  };

  const saveToStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  };

  const loadFromStorage = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to load from localStorage:', error);
      return defaultValue;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LemonSquiz 🍋</h1>
        {renderContent()}
      </header>
    </div>
  );
}

export default App;
