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

const scoreMap = {
  1: { // What's your ideal summer activity?
    Beach:       { Calippo: 2, Cornetto: 1 },
    Hiking:      { Kaktusz: 2, BigTrio: 1 },
    Reading:     { Szendvics: 2, IceNGo: 1 },
    Partying:    { CikkCakk: 2, Calippo: 1 }
  },
  2: { // Pick a color palette
    Pastels:     { Tappancs: 2, Cornetto: 1 },
    Neon:        { Cerka: 2, Twister: 1 },
    "Earth tones": { BigTrio: 2, Kaktusz: 1 },
    Monochrome:  { IceNGo: 2, Szendvics: 1 }
  },
  3: { // You're at a party. You are:
    Dancing:     { Calippo: 2, CikkCakk: 1 },
    Chatting:    { Twister: 2, Cornetto: 1 },
    Eating:      { BigTrio: 2, Szendvics: 1 },
    Watching:    { IceNGo: 2, Tappancs: 1 }
  },
  4: { // How do you solve problems?
    "Head-on":   { Kaktusz: 2, Calippo: 1 },
    "Avoid them": { Cerka: 2, CikkCakk: 1 },
    "Ask for help": { Tappancs: 2, Cornetto: 1 },
    Overthink:   { IceNGo: 2, Szendvics: 1 }
  },
  5: { // Dream vacation spot
    Tokyo:       { Cerka: 2, IceNGo: 1 },
    Paris:       { Cornetto: 2, Tappancs: 1 },
    Iceland:     { Kaktusz: 2, BigTrio: 1 },
    Maldives:    { Calippo: 2, Twister: 1 }
  },
  6: { // Favorite kind of movie?
    Comedy:      { Twister: 2, Calippo: 1 },
    Horror:      { Cerka: 2, IceNGo: 1 },
    Drama:       { Cornetto: 2, Tappancs: 1 },
    Romance:     { Szendvics: 2, Cornetto: 1 }
  },
  7: { // Choose a pet
    Dog:         { BigTrio: 2, Tappancs: 1 },
    Cat:         { Cornetto: 2, IceNGo: 1 },
    Bird:        { Twister: 2, Cerka: 1 },
    "No pet":    { Szendvics: 2, Kaktusz: 1 }
  },
  8: { // How often do you plan things?
    Always:      { BigTrio: 2, Szendvics: 1 },
    Sometimes:   { Cornetto: 2, IceNGo: 1 },
    Rarely:      { CikkCakk: 2, Calippo: 1 },
    Never:       { Cerka: 2, Twister: 1 }
  },
  9: { // Sweet or sour?
    Sweet:       { Tappancs: 2, Cornetto: 1 },
    Sour:        { Kaktusz: 2, CikkCakk: 1 }
  },
  10: { // You see someone crying
    Hug:         { Tappancs: 2, Cornetto: 1 },
    Talk:        { BigTrio: 2, Calippo: 1 },
    Ignore:      { Cerka: 2, IceNGo: 1 },
    Panic:       { CikkCakk: 2, Twister: 1 }
  }
};


const results = [
  "Calippo", "Kaktusz", "IceNGo", "Szendvics", "Cornetto",
  "CikkCakk", "Cerka", "BigTrio", "Tappancs", "Twister"
];


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
      const scores = {};
    
      for (let qId in answers) {
        const answer = answers[qId];
        const scoreEntries = scoreMap[qId]?.[answer];
    
        if (scoreEntries) {
          for (let [iceCream, points] of Object.entries(scoreEntries)) {
            scores[iceCream] = (scores[iceCream] || 0) + points;
          }
        }
      }
    
      const maxScore = Math.max(...Object.values(scores));
      const topResults = Object.entries(scores)
        .filter(([_, score]) => score === maxScore)
        .map(([iceCream]) => iceCream);
    
      const selected = topResults[Math.floor(Math.random() * topResults.length)];
      setResult(selected);
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
    const filename = result.toLowerCase().replace(/'/g, "").replace(/\s/g, "") + ".png";
    const imagePath = `${process.env.PUBLIC_URL}/assets/results/${filename}`;
  
    return (
      <div className="result">
        <img
          src={imagePath}
          alt={`You got ${result}`}
          className="result-image"
          id="result-image"
        />
  
        <div className="result-buttons">
          <a href={imagePath} download={`icecream-${filename}`} className="result-button">
            Download
          </a>
          <button
            className="result-button"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Which Hungarian Ice Cream Are You?',
                  text: `I got ${result}! 🍦`,
                  url: window.location.href
                }).catch((err) => console.log('Share cancelled or failed:', err));
              } else {
                alert("Sharing is not supported on this device.");
              }
            }}
          >
            Share
          </button>
        </div>
      </div>
    );
  }
  

  

  const q = questions[currentQuestion];
  const isAnswered = answers[q.id];

  return (
    <div className="quiz-container">
      <img
        src={`${process.env.PUBLIC_URL}/assets/logo.png`}
        alt="Which Hungarian Ice Cream Are You?"
        className="quiz-logo"
      />

      <div className={`slide ${direction}`} key={currentQuestion}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/questions/${imageFilenames[currentQuestion]}`}
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
