import React, { useState } from "react";
import { languages } from "./languages.js";
import { clsx } from "clsx";
import { getFarewellText,getRandomWord } from "./utils.js";

export default function AssemblyEndgame() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const [currentWord, setCurrentWord] = useState(()=>getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const lastGuessedLetter=guessedLetters[guessedLetters.length-1]
  const isLastGuessIncorrect=lastGuessedLetter&&!currentWord.includes(lastGuessedLetter);


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

    function renderGameStatus(){
      if(!isGameOver && isLastGuessIncorrect)
      {
        return <p className="farewell-message">{getFarewellText(languages[wrongGuessedCount-1].name)}</p>;
      }
      if(isGameWon)
      {
        return(
          <>
           <h2>You Win</h2>
           <p>Well done!</p>
         </>
        )
      }
      if(isGameLost)
      {
        return(
          <>
             <h2>Game Over!</h2>
             <p>You Lose!Better start learning Assembly</p>
          </>
        )
      }
      else{
        return null;
      }
    }

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });

    return (
      <button
      disabled={isGameOver}
      aria-disabled={guessedLetters.includes(letter)}
      aria-label={`Letter ${letter}`}
        className={className}
        key={letter}
        onClick={() => addGuessedLetter(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const letterElements = currentWord.split("").map((letter, index) => {
    const shouldRevealLetter=isGameLost || uessedLetters.includes(letter);
    const letterClassName=clsx(
      isGameLost && !guessedLetters.includes(letter)&&"missed-letter"
    )
    return( 
    <span key={index} className={letterClassName}>
      {shouldRevealLetter?letter.toUpperCase():""}
    </span>)
  }
  

  function addGuessedLetter(letter) {
    setGuessedLetters(prevLetters =>
      prevLetters.includes(letter)
        ? prevLetters
        : [...prevLetters, letter]
    );
  }

  function startNewGame(){
    setCurrentWord(getRandomWord());
    setGuessedLetters([]);

  }

  const gameStatusClass=clsx("game-status",{
    won:isGameWon,
    lost:isGameLost,
    farewell:!isGameOver && isLastGuessIncorrect
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

      <section aria-live="polite" role="status" className={gameStatusClass}>
       {renderGameStatus()}    
      </section>

      <section className="language-chips">
        {languageElements}
      </section>

      <section className="word">
        {letterElements}
      </section>

      <section className="sr-only" aria-live="polite" role="status">
        <p>
          {currentWord.includes(lastGuessedLetter)?
          `correct!the letter ${lastGuessedLetter} is in the word`:
          `sorry,the letter ${lastGuessedLetter} is not in the word`}
        </p>
       <p>Current word:{currentWord.split("").map(letter=>
        guessedLetters.includes(letter)? letter:"blank"
       ).join(" ")}</p>
      </section>

      <section className="keyboard">
        {keyboardElements}
      </section>
      {isGameOver && <button className="new-game" onClick={startNewGame}>New Game</button>}
    </main>
  );
}