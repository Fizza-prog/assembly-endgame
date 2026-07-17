import React, { useState } from "react";
import { languages } from "./languages.js";
import { clsx } from "clsx";
import { getFarewellText, getRandomWord } from "./utils.js";
import Confetti from "react-confetti";

export default function AssemblyEndgame() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);

  const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const wrongGuessedCount = guessedLetters.filter(
    letter => !currentWord.includes(letter)
  ).length;

  const isGameWon = currentWord
    .split("")
    .every(letter => guessedLetters.includes(letter));

  const isGameLost = wrongGuessedCount >= languages.length - 1;

  const isGameOver = isGameWon || isGameLost;

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-msg">
          {getFarewellText(languages[wrongGuessedCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You Win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }

    if (isGameLost) {
      return (
        <>
          <h2>Game Over!</h2>
          <p>You lose! Better start learning Assembly.</p>
        </>
      );
    }

    return null;
  }

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessedCount;

    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };

    const className = clsx("chip", isLanguageLost && "lost");

    return (
      <span
        key={lang.name}
        className={className}
        style={styles}
      >
        {lang.name}
      </span>
    );
  });

  const keyboardElements = alphabet.split("").map(letter => {
    const isGuessed = guessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.includes(letter);
    const isWrong = isGuessed && !currentWord.includes(letter);

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
        key={letter}
        className={className}
        disabled={isGameOver}
        aria-disabled={isGameOver}
        aria-label={`Letter ${letter}`}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter =
      isGameLost || guessedLetters.includes(letter);

    const letterClassName = clsx(
      isGameLost &&
        !guessedLetters.includes(letter) &&
        "missed-letter"
    );

    return (
      <span key={index} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
      </span>
    );
  });

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter)
        ? prevLetters
        : [...prevLetters, letter]
    );
  }

  function startNewGame() {
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);
  }

  const gameStatusClass = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  return (
    <main>
      {isGameWon && (
        <Confetti
          recycle={false}
          numberOfPieces={1000}
        />
      )}

      <header>
        <h1>Assembly: Endgame</h1>
        <p>
          Guess the word within 8 attempts to keep the programming
          world safe from Assembly!
        </p>
      </header>

      <section
        className={gameStatusClass}
        aria-live="polite"
        role="status"
      >
        {renderGameStatus()}
      </section>

      <section className="language-chips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      <section
        className="sr-only"
        aria-live="polite"
        role="status"
      >
        {lastGuessedLetter && (
          <p>
            {currentWord.includes(lastGuessedLetter)
              ? `Correct! The letter ${lastGuessedLetter} is in the word.`
              : `Sorry, the letter ${lastGuessedLetter} is not in the word.`}
          </p>
        )}

        <p>
          Current word:{" "}
          {currentWord
            .split("")
            .map(letter =>
              guessedLetters.includes(letter)
                ? letter
                : "blank"
            )
            .join(" ")}
        </p>
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>

      {isGameOver && (
        <button
          className="new-game"
          onClick={startNewGame}
        >
          New Game
        </button>
      )}
    </main>
  );
}