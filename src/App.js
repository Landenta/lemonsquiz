import { useState } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [currentLevel, setCurrentLevel] = useState(1);

  const topics = [
    { id: 1, name: 'בירות עולם', icon: '🏙️' },
    { id: 2, name: 'דגלים', icon: '🎌' },
    { id: 3, name: 'מאכלים לאומיים', icon: '🍽️' },
    { id: 4, name: 'מטבעות של מדינות', icon: '💰' }
  ];
  
  const quizData = {
    capitals: {
      1: [
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
      2: [
        {
          question: "מהי עיר הבירה של פינלנד?",
          options: ["אוסלו", "הלסינקי", "סטוקהולם", "קופנהגן"],
          correctAnswer: "הלסינקי"
        },
        {
          question: "מהי עיר הבירה של אירלנד?",
          options: ["אדינבורו", "קרדיף", "דבלין", "בלפסט"],
          correctAnswer: "דבלין"
        },
        {
          question: "מהי עיר הבירה של הונגריה?",
          options: ["זאגרב", "פראג", "וינה", "בודפשט"],
          correctAnswer: "בודפשט"
        },
        {
          question: "מהי עיר הבירה של דנמרק?",
          options: ["סטוקהולם", "קופנהגן", "אוסלו", "הלסינקי"],
          correctAnswer: "קופנהגן"
        },
        {
          question: "מהי עיר הבירה של פורטוגל?",
          options: ["מדריד", "ברצלונה", "ליסבון", "פורטו"],
          correctAnswer: "ליסבון"
        },
        {
          question: "מהי עיר הבירה של פולין?",
          options: ["בוקרשט", "ורשה", "בודפשט", "פראג"],
          correctAnswer: "ורשה"
        },
        {
          question: "מהי עיר הבירה של יוון?",
          options: ["סלוניקי", "איסטנבול", "אתונה", "רומא"],
          correctAnswer: "אתונה"
        },
        {
          question: "מהי עיר הבירה של אוסטריה?",
          options: ["ברן", "וינה", "ציריך", "מינכן"],
          correctAnswer: "וינה"
        },
        {
          question: "מהי עיר הבירה של צ'כיה?",
          options: ["ברטיסלבה", "ורשה", "בודפשט", "פראג"],
          correctAnswer: "פראג"
        },
        {
          question: "מהי עיר הבירה של נורבגיה?",
          options: ["קופנהגן", "סטוקהום", "אוסלו", "הלסינקי"],
          correctAnswer: "אוסלו"
        }
      ]
    },
    flags: {
      1: [
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
          options: ["ארצנטינה", "ברזיל", "קולומביה", "צ'ילה"],
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
          options: ["נורבגיה", "פינלנד", "דנמרק", "שוודיה"],
          correctAnswer: "שוודיה"
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
      2: [
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇳🇱",
          options: ["לוקסמבורג", "הולנד", "קרואטיה", "סלובניה"],
          correctAnswer: "הולנד"
        },
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇮🇷",
          options: ["יפן", "אירן", "טייוואן", "וייטנאם"],
          correctAnswer: "אירן"
        },
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇲🇽",
          options: ["ברזיל", "ארגנטינה", "מקסיקו", "קולומביה"],
          correctAnswer: "מקסיקו"
        },
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇵🇸",
          options: ["ניו זילנד", "כלום", "פיג'י", "טונגה"],
          correctAnswer: "כלום"
        },
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇪🇬",
          options: ["סודן", "מצרים", "עיראק", "סוריה"],
          correctAnswer: "מצרים"
        },
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇵🇹",
          options: ["ספרד", "פורטוגל", "יוון", "מלטה"],
          correctAnswer: "פורטוגל"
        },
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇨🇭",
          options: ["אוסטריה", "דנמרק", "שוויץ", "פולין"],
          correctAnswer: "שוויץ"
        },
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇸🇬",
          options: ["תאילנד", "סינגפור", "מלזיה", "אינדונזיה"],
          correctAnswer: "סינגפור"
        },
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇦🇷",
          options: ["צ'ילה", "אורוגוואי", "ארגנטינה", "פרגוואי"],
          correctAnswer: "ארגנטינה"
        },
        {
          question: "לאיזו מדינה שייך הדגל הזה? 🇹🇷",
          options: ["מרוקו", "טורקיה", "טוניסיה", "אלג'יריה"],
          correctAnswer: "טורקיה"
        }
      ]
    },
    foods: {
      1: [
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
          options: ["פאייה", "פיצה", "סושי", "קרואסון"],
          correctAnswer: "פאייה"
        },
        {
          question: "איזה מאכל מזוהה עם תאילנד?",
          options: ["פאד תאי", "סושי", "פיצה", "קארי"],
          correctAnswer: "פאד תאי"
        },
        {
          question: "איזה מאכל מזוהה עם ארצות הברית?",
          options: ["המבורגר", "פיצה", "סושי", "ציפ׳ס"],
          correctAnswer: "המבורגר"
        }
      ],
      2: [
        {
          question: "איזה מאכל מזוהה עם וייטנאם?",
          options: ["פו", "סושי", "פאד תאי", "דים סאם"],
          correctAnswer: "פו"
        },
        {
          question: "איזה מאכל מזוהה עם ישראל ?",
          options: ["פלאפל", "פסטה", "פיתה", "שניצל"],
          correctAnswer: "פלאפל"
        },
        {
          question: "איזה מאכל מזוהה עם מרוקו?",
          options: ["טאג'ין", "פלאפל", "חומוס", "שווארמה"],
          correctAnswer: "טאג'ין"
        },
        {
          question: "איזה מאכל מזוהה עם שוודיה?",
          options: ["קוטבולר", "שניצל", "המבורגר", "פיצה"],
          correctAnswer: "קוטבולר"
        },
        {
          question: "איזה מאכל מזוהה עם ברזיל?",
          options: ["פייז'ואדה", "טאקוס", "פאייה", "פסטה"],
          correctAnswer: "פייז'ואדה"
        },
        {
          question: "איזה מאכל מזוהה עם קוריאה?",
          options: ["קימצ'י", "סושי", "פו", "דים סאם"],
          correctAnswer: "קימצ'י"
        },
        {
          question: "איזה מאכל מזוהה עם רוסיה?",
          options: ["בורשט", "שניצל", "פירושקי", "גולאש"],
          correctAnswer: "בורשט"
        },
        {
          question: "איזה מאכל מזוהה עם הונגריה?",
          options: ["גולאש", "שניצל", "פירושקי", "בורשט"],
          correctAnswer: "גולאש"
        },
        {
          question: "איזה מאכל מזוהה עם פרו?",
          options: ["סביצ'ה", "טאקוס", "פאייה", "אמפנדה"],
          correctAnswer: "סביצ'ה"
        },
        {
          question: "איזה מאכל מזוהה עם אתיופיה?",
          options: ["אינג'רה", "חומוס", "פלאפל", "שווארמה"],
          correctAnswer: "אינג'רה"
        }
      ]
    },
    currencies: {
      1: [
        {
          question: "מהו המטבע של ארצות הברית?",
          options: ["אירו", "ין", "דולר", "פאונד"],
          correctAnswer: "דולר"
        },
        {
          question: "מהו המטבע של בריטניה?",
          options: ["אירו", "פאונד", "דולר", "פרנק"],
          correctAnswer: "פאונד"
        },
        {
          question: "מהו המטבע של יפן?",
          options: ["דולר", "וון", "יואן", "ין"],
          correctAnswer: "ין"
        },
        {
          question: "מהו המטבע של האיחוד האירופי?",
          options: ["פרנק", "דולר", "אירו", "פאונד"],
          correctAnswer: "אירו"
        },
        {
          question: "מהו המטבע של סין?",
          options: ["ין", "וון", "יואן", "רופי"],
          correctAnswer: "יואן"
        },
        {
          question: "מהו המטבע של רוסיה?",
          options: ["אירו", "רובל", "דולר", "זלוטי"],
          correctAnswer: "רובל"
        },
        {
          question: "מהו המטבע של קוריאה הדרומית?",
          options: ["ין", "וון", "יואן", "רינגיט"],
          correctAnswer: "וון"
        },
        {
          question: "מהו המטבע של שוויץ?",
          options: ["אירו", "דולר", "פרנק שוויצרי", " כתר שוויצרי"],
          correctAnswer: "פרנק שוויצרי"
        },
        {
          question: "מהו המטבע של הודו?",
          options: ["דולר", "רופי", "יואן", "רובל"],
          correctAnswer: "רופי"
        },
        {
          question: "מהו המטבע של מקסיקו?",
          options: ["אירו", "דולר", "ריאל", "פסו"],
          correctAnswer: "פסו"
        }
      ],
      2: [
        {
          question: "מהו המטבע של שוודיה?",
          options: ["אירו", "כתר שוודי", "קרונה", "פאונד"],
          correctAnswer: "כתר שוודי"
        },
        {
          question: "מהו המטבע של ברזיל?",
          options: ["פסו", "דולר", "ריאל", "אירו"],
          correctAnswer: "ריאל"
        },
        {
          question: "מהו המטבע של תאילנד?",
          options: ["רינגיט", "רופי", "באט", "דונג"],
          correctAnswer: "באט"
        },
        {
          question: "מהו המטבע של טורקיה?",
          options: ["דינר", "לירה טורקית", "אירו", "דולר"],
          correctAnswer: "לירה טורקית"
        },
        {
          question: "מהו המטבע של פולין?",
          options: ["אירו", "כתר", "פורינט", "זלוטי"],
          correctAnswer: "זלוטי"
        },
        {
          question: "מהו המטבע של הונגריה?",
          options: ["זלוטי", "פורינט", "אירו", "כתר"],
          correctAnswer: "פורינט"
        },
        {
          question: "מהו המטבע של דרום אפריקה?",
          options: ["שילינג", "דולר", "ראנד", "פאונד"],
          correctAnswer: "ראנד"
        },
        {
          question: "מהו המטבע של נורבגיה?",
          options: ["אירו", "קרונה", "כתר נורבגי", "כתר שוודי"],
          correctAnswer: "כתר נורבגי"
        },
        {
          question: "מהו המטבע של אינדונזיה?",
          options: ["רינגיט", "באט", "פזו", "רופיה"],
          correctAnswer: "רופיה"
        },
        {
          question: "מהו המטבע של ערב הסעודית?",
          options: ["דינר", "דירהם", "ריאל סעודי", "לירה"],
          correctAnswer: "ריאל סעודי"
        }
      ]
    }
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
              setGameState('topics');
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
    return quizData[currentTopic][currentLevel] || [];
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
            <button 
              className="start-button"
              onClick={() => setGameState('topics')}
            >
              מדינות🌍
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
            <div className="quiz-header">
              <div className="level-indicator">רמה {currentLevel}</div>
              <div className="question-counter">שאלה {currentQuestion + 1} מתוך {questions.length}</div>
              <button 
                className="exit-button"
                onClick={() => {
                  setGameState('topics');
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
