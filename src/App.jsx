import React, {useState} from "react"
import {languages} from "./languages.js"
import {clsx} from "clsx"

export default function AssemblyEndgame()
{
  const alphabet="abcdefghijklmnopqrstuvwxyz";
  const [currentWord,setCurrentWord]=useState("REACT");
  const [guessedLetters,setGuessedLetters]=useState("");
  const languageElements=languages.map(lang=>{
    const styles={
      backgroundColor:lang.backgroundColor,
      color:lang.color,
    }
      const keyboardElements=aplhabet.split("").map(letter=>{
      const isGuessed=guessedLetters.includes(letter);
      const isCorrect=isGuessed && currentWord.includes(letter);
      const isWrong=!isGuessed && currentWord.includes(letter);
      const className=clsx({
        correct:isCorrect,
        wrong:isWrong,
      });
      return(<button 
        className={className}
        key={letter} 
        onClick={()=>addGuessedLetter(letter)}>
        {letter.toUpperCase()}
        </button>)
    }
    )
    return(
    <span 
    key={lang.name}
    className="chip" 
    style={styles}>{lang.name}</span>
    )
  })
  const letterElements=currentWord.split("").map((letter,index)=>
    (<span key={index}>
      {guessedLetters.includes(letter)?
      letter.toUpperCase():""}</span>)
  )
  function addGuessedLetter(letter)
  {
       setGuessedLetters(prevLetters=>
       prevLetters.includes(letter)?
       prevLetters:[...prevLetters,letter])
  }



  return(
    <main>
      <header>
        <h1>Assembly:Endgame</h1>
        <p>Guess the word within 8 attempts to 
          keep the programming world safe from 
          Assembly!
        </p>
      </header>
      <section className="game-status">
        <h2>You Win</h2>
        <p>Well done!</p>
        <section className="language-chips">
           {languageElements}
        </section>
        <section className="word">
           {letterElements}
        </section>
        <section className="keyboard">
            {keyboardElements}
        </section>

      </section>

    </main>
  )
}