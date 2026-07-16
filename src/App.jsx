import React, { useState } from "react";
import { languages } from "./languages.js";
import { clsx } from "clsx";

export default function AssemblyEndgame() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const [currentWord, setCurrentWord] = useState("REACT");
  const [guessedLetters, setGuessedLetters] = useState([]);

  const wrongGuessedCount =
    guessedLetters.filter(letter => !currentWord.includes(letter)).length;

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessedCount;

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    const className=clsx("chip",isLanguageLost&&"lost")

    return (
      <span
        className={className}
        style={styles}
        key={lang.name}
      >
        {lang.name}
      </span>
    );
  });

  const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);
    const isGameWon=currentWord.split("").every(letter=>guessedLetters.includes(letter));
    const isGameLost=wrongGuessedCount>=languages.length-1;
    const isGameOver=isGameWon||isGameLost;

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        className={className}
        key={letter}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => (
    <span key={index}>
      {guessedLetters.includes(letter.toLowerCase())
        ? letter.toUpperCase()
        : ""}
    </span>
  ));

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter)
        ? prevLetters
        : [...prevLetters, letter]
    );
  }

  const gameStatusClass=clsx("game-status",{
    won:isGameWon,
    lost:isGameLost,
  })

  return (
    <main>
      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>

      <section className={gameStatusClass}>
       {isGameOver?(
        isGameWon?(
          <>
           <h2>You Win</h2>
           <p>Well done!</p>
         </>
        ) :( <>
             <h2>Game Over!</h2>
             <p>You Lose!Better start learning Assembly</p>
             </> )
                    ) : ( null )
       }
         
      </section>

      <section className="language-chips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>
      {isGameOver && <button className="new-game">New Game</button>}
    </main>
  );
}