import React, { useState } from 'react';
import './App.css';

const questions = [
  { id: 1, text: "What's your ideal summer activity?", options: ["Beach", "Hiking", "Reading", "Partying"] },
  { id: 2, text: "Pick a color palette.", options: ["Pastels", "Neon", "Earth tones", "Monochrome"] },
  { id: 3, text: "You're at a party. You are:", options: ["Dancing", "Chatting", "Eating", "Watching"] },
  { id: 4, text: "How do you solve problems?", options: ["Head-on", "Avoid them", "Ask for help", "Overthink"] },
  { id: 5, text: "Pick a dream vacation spot.", options: ["Tokyo", "Paris", "Iceland", "Maldives"] },
  { id: 6, text: "Favorite kind of movie?", options: ["Comedy", "Horror", "Drama", "Romance"] },
  { id: 7, text: "Choose a pet.", options: ["Dog", "Cat", "Bird", "No pet"] },
  { id: 8, text: "How often do you plan things?", options: ["Always", "Sometimes", "Rarely", "Never"] },
  { id: 9, text: "Sweet or sour?", options: ["Sweet", "Sour"] },
  { id: 10, text: "You see someone crying — what do you do?", options: ["Hug", "Talk", "Ignore", "Panic"] }
];

const imageFilenames = [
  "q1-summer-activities.png",
  "q2-color-palettes.png",
  "q3-party-personality.png",
  "q4-problem-solving.png",
  "q5-vacation-spots.png",
  "q6-movie-genres.png",
  "q7-choose-a-pet.png",
  "q8-planning-habits.png",
  "q9-sweet-or-sour.png",
  "q10-emotional-response.png"
];


const results = ["Calippo", "Kaktusz", "Ice'n'go", "Szendvics fagyi", "Cornetto", "Cikk Cakk", "Cerka", "Big Trio", "Tappancs", "Twister"];

function App() {
  const [direction, setDirection] = useState('forward');
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const handleOptionClick = (option) => {
    const qId = questions[currentQuestion].id;
    setAnswers({ ...answers, [qId]: option });
  };

  const handleNext = () => {
    setDirection('forward');
    if (currentQuestion === questions.length - 1) {
      const rand = Math.floor(Math.random() * results.length);
      setResult(results[rand]);
      setShowResult(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setDirection('backward');
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
  };

  if (showResult) {
    return (
      <div className="result">
        <h1>You got: {result}</h1>
        <p>Thanks for playing!</p>
      </div>
    );
  }

  const q = questions[currentQuestion];
  const isAnswered = answers[q.id];

  return (
    <div className="quiz-container">
      <img
        src="/assets/logo.png"
        alt="Which Hungarian Ice Cream Are You?"
        className="quiz-logo"
      />

      <div className={`slide ${direction}`} key={currentQuestion}>
        <img
          src={`/assets/questions/${imageFilenames[currentQuestion]}`}
          alt=""
          className="question-image"
        />
        <p><strong>{q.text}</strong></p>
        <div>
          {q.options.map((opt) => (
            <button
              key={opt}
              className={`option-button ${answers[q.id] === opt ? 'selected' : ''}`}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="nav-buttons">
      {currentQuestion > 0 ? (
          <button className="submit-button" onClick={handlePrevious}>Previous</button>
        ) : (
          <div style={{ width: "120px" }}></div>  // Placeholder to reserve space
        )}

        <button
          className="submit-button"
          onClick={handleNext}
          disabled={!isAnswered}
        >
          {currentQuestion === questions.length - 1 ? "See My Result" : "Next"}
        </button>
      </div>

    </div>
  );
}

export default App;
