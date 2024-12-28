import { useState } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);

  const topics = [
    { id: 1, name: 'בירות עולם', icon: '🏛️' },
    { id: 2, name: 'דגלים', icon: '🎌' },
    { id: 3, name: 'מאכלים לאומיים', icon: '🍽️' },
    { id: 4, name: 'מטבעות של מדינות', icon: '💰' }
  ];
  
  const quizData = {
    capitals: [
      {
        question: "מה היא בירת צרפת?",
        options: ["לונדון", "מדריד", "פריז", "רומא"],
        correctAnswer: "פריז"
      },
      {
        question: "מה היא בירת יפן?",
        options: ["סיאול", "בייג'ינג", "בנגקוק", "טוקיו"],
        correctAnswer: "טוקיו"
      },
      {
        question: "מה היא בירת ברזיל?",
        options: ["ברזיליה", "ריו דה ז'נרו", "סאו פאולו", "בואנוס איירס"],
        correctAnswer: "ברזיליה"
      },
      {
        question: "מה היא בירת אוסטרליה?",
        options: ["סידני", "מלבורן", "קנברה", "בריסביין"],
        correctAnswer: "קנברה"
      },
      {
        question: "מה היא בירת מצרים?",
        options: ["קהיר", "אלכסנדריה", "דובאי", "אמן"],
        correctAnswer: "קהיר"
      },
      {
        question: "מה היא בירת קנדה?",
        options: ["טורונטו", "מונטריאול", "ונקובר", "אוטווה"],
        correctAnswer: "אוטווה"
      },
      {
        question: "מה היא בירת ספרד?",
        options: ["ברצלונה", "מדריד", "ולנסיה", "סביליה"],
        correctAnswer: "מדריד"
      },
      {
        question: "מה היא בירת הודו?",
        options: ["מומבאי", "ניו דלהי", "בנגלור", "כלכותה"],
        correctAnswer: "ניו דלהי"
      },
      {
        question: "מה היא בירת ארגנטינה?",
        options: ["בואנוס איירס", "סנטיאגו", "לימה", "מונטווידאו"],
        correctAnswer: "בואנוס איירס"
      },
      {
        question: "מה היא בירת דרום אפריקה?",
        options: ["קייפטאון", "יוהנסבורג", "פרטוריה", "דרבן"],
        correctAnswer: "פרטוריה"
      }
    ],
    
    flags: [
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇯🇵",
        options: ["סין", "יפן", "וייטנאם", "קוריאה"],
        correctAnswer: "יפן"
      },
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇮🇹",
        options: ["ספרד", "צרפת", "איטליה", "יוון"],
        correctAnswer: "איטליה"
      },
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇧🇷",
        options: ["ארגנטינה", "ברזיל", "קולומביה", "צ'ילה"],
        correctAnswer: "ברזיל"
      },
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇬🇧",
        options: ["בריטניה", "אוסטרליה", "ניו זילנד", "קנדה"],
        correctAnswer: "בריטניה"
      },
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇨🇦",
        options: ["קנדה", "ארה״ב", "מקסיקו", "אלסקה"],
        correctAnswer: "קנדה"
      },
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇿🇦",
        options: ["קניה", "ניגריה", "דרום אפריקה", "אתיופיה"],
        correctAnswer: "דרום אפריקה"
      },
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇸🇪",
        options: ["נורבגיה", "פינלנד", "דנמרק", "שבדיה"],
        correctAnswer: "שבדיה"
      },
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇦🇺",
        options: ["ניו זילנד", "אוסטרליה", "פיג'י", "פפואה גינאה החדשה"],
        correctAnswer: "אוסטרליה"
      },
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇩🇪",
        options: ["בלגיה", "גרמניה", "הולנד", "לוקסמבורג"],
        correctAnswer: "גרמניה"
      },
      {
        question: "לאיזו מדינה שייך הדגל הזה? 🇰🇷",
        options: ["צפון קוריאה", "דרום קוריאה", "יפן", "טייוואן"],
        correctAnswer: "דרום קוריאה"
      }
    ],
    
    foods: [
      {
        question: "איזה מאכל מזוהה עם איטליה?",
        options: ["סושי", "פיצה", "המבורגר", "פלאפל"],
        correctAnswer: "פיצה"
      },
      {
        question: "איזה מאכל מזוהה עם יפן?",
        options: ["סושי", "פסטה", "טאקוס", "קרואסון"],
        correctAnswer: "סושי"
      },
      {
        question: "איזה מאכל מזוהה עם מקסיקו?",
        options: ["פאייה", "טאקוס", "סושי", "שניצל"],
        correctAnswer: "טאקוס"
      },
      {
        question: "איזה מאכל מזוהה עם צרפת?",
        options: ["קרואסון", "פיצה", "המבורגר", "סושי"],
        correctAnswer: "קרואסון"
      },
      {
        question: "איזה מאכל מזוהה עם יוון?",
        options: ["פלאפל", "סושי", "מוסקה", "פיצה"],
        correctAnswer: "מוסקה"
      },
      {
        question: "איזה מאכל מזוהה עם הודו?",
        options: ["סושי", "פיצה", "קארי", "המבורגר"],
        correctAnswer: "קארי"
      },
      {
        question: "איזה מאכל מזוהה עם גרמניה?",
        options: ["שניצל", "פיצה", "סושי", "טאקוס"],
        correctAnswer: "שניצל"
      },
      {
        question: "איזה מאכל מזוהה עם ספרד?",
        options: ["פיצה", "פאייה", "סושי", "המבורגר"],
        correctAnswer: "פאייה"
      },
      {
        question: "איזה מאכל מזוהה עם תאילנד?",
        options: ["פאד תאי", "סושי", "פיצה", "המבורגר"],
        correctAnswer: "פאד תאי"
      },
      {
        question: "איזה מאכל מזוהה עם ארגנטינה?",
        options: ["פיצה", "סושי", "אסאדו", "טאקוס"],
        correctAnswer: "אסאדו"
      }
    ],
    
    currencies: [
      {
        question: "מהו המטבע של בריטניה?",
        options: ["אירו", "דולר", "לירה שטרלינג", "יין"],
        correctAnswer: "לירה שטרלינג"
      },
      {
        question: "מהו המטבע של יפן?",
        options: ["וון", "יין", "דולר", "יואן"],
        correctAnswer: "יין"
      },
      {
        question: "מהו המטבע של האיחוד האירופי?",
        options: ["דולר", "אירו", "פרנק", "לירה"],
        correctAnswer: "אירו"
      },
      {
        question: "מהו המטבע של סין?",
        options: ["יין", "וון", "יואן", "רופי"],
        correctAnswer: "יואן"
      },
      {
        question: "מהו המטבע של אוסטרליה?",
        options: ["דולר אוסטרלי", "פאונד", "אירו", "דולר אמריקאי"],
        correctAnswer: "דולר אוסטרלי"
      },
      {
        question: "מהו המטבע של שוויץ?",
        options: ["אירו", "פרנק שוויצרי", "כתר", "לירה"],
        correctAnswer: "פרנק שוויצרי"
      },
      {
        question: "מהו המטבע של רוסיה?",
        options: ["רובל", "לב", "זלוטי", "קרונה"],
        correctAnswer: "רובל"
      },
      {
        question: "מהו המטבע של הודו?",
        options: ["יואן", "רופי", "דינר", "דירהם"],
        correctAnswer: "רופי"
      },
      {
        question: "מהו המטבע של ברזיל?",
        options: ["פזו", "ריאל", "בוליבר", "סול"],
        correctAnswer: "ריאל"
      },
      {
        question: "מהו המטבע של דרום קוריאה?",
        options: ["יין", "וון", "יואן", "רינגיט"],
        correctAnswer: "וון"
      }
    ]
  };

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

  const getCurrentQuestions = () => {
    return quizData[currentTopic] || [];
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
        } else {
          setGameState('finished');
        }
        setSelectedAnswer(null);
        setIsChecking(false);
      }, 1000);
    }, 500);
  };

  const renderContent = () => {
    switch (gameState) {
      case 'welcome':
        return (
          <div className="quiz-container">
            <p>ברוכים הבאים לשאלון הדגלים והמדינות!</p>
            <button 
              className="start-button"
              onClick={() => setGameState('topics')}
            >
              התחל משחק
            </button>
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
          </div>
        );
      
      case 'quiz':
        const questions = getCurrentQuestions();
        return (
          <div className="quiz-container">
            <div className="question-counter">שאלה {currentQuestion + 1} מתוך {questions.length}</div>
            <div className="score">ניקוד: {score}</div>
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
        return (
          <div className="quiz-container">
            <h2>סיימת את השאלון!</h2>
            <p>הציון שלך: {score} מתוך {getCurrentQuestions().length}</p>
            <button 
              className="start-button"
              onClick={() => setGameState('topics')}
            >
              חזור לבחירת נושא
            </button>
          </div>
        );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>שאלון דגלים ומדינות</h1>
        {renderContent()}
      </header>
    </div>
  );
}

export default App;
