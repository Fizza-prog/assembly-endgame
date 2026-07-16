import React from "react"
import {languages} from "./languages.js"




export default function AssemblyEndgame()
{
  const languageElements=languages.map(lang=>{
    const styles={
      backgroundColor:lang.backgroundColor,
      color:lang.color,
    }
    return(
    <span 
    key={lang.name}
    className="chip" 
    style={styles}>{lang.name}</span>
    )
  })
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

      </section>

    </main>
  )
}