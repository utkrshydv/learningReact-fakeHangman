import { useState, useEffect } from "react"
import { languages } from "./language"
import { clsx } from "clsx"
import { generate } from "random-words"
import Confetti from "react-confetti"

function App() {

  const [guessedLetter, setGuessedLetter] = useState([])
  console.log(guessedLetter)

  const [currentWord, setCurrentWord] = useState(() => generate({ maxLength: 6}))

  console.log(currentWord)

  const isGameWon = Array.from(new Set(currentWord)).every(letter => 
    guessedLetter.includes(letter)
  );
  
  console.log(isGameWon)

  const wordArray = Array.from(currentWord)
  
  const keyboard = "abcdefghijklmnopqrstuvwxyz"

  const wrongGuessCount = guessedLetter.filter(letter => !currentWord.includes(letter)).length
  


  function reset(){
    setGuessedLetter([])
  }
  
  function userGuess(id){
    if(currentWord.includes(id)){
      console.log(id)
    }
       setGuessedLetter(prevletter => [...prevletter,id])  
}

   
   const displayKeyboard = keyboard.split("").map((letter) => {

    const isGuessed = guessedLetter.includes(letter)
    
    const isCorrect =  isGuessed && currentWord.includes(letter)
    const isWrong = isGuessed && !currentWord.includes(letter)

    const className = clsx({
      correct:isCorrect,
      wrong: isWrong, 
    })
    return(
      <button
      disabled = {isGameWon||wrongGuessCount>8}
      onClick={()=>userGuess(letter)}
       className={className}
       value={letter}
       key={letter}>
        {letter.toUpperCase()}
      </button>
    )
  })

  const displayWord = wordArray.map((letter, index) => {
    const isGuessed = guessedLetter.includes(letter);
  
    const styles = {
      fontSize: "25px",
      borderBottom: "2px solid #F9F4DA",
      background: "#323232",
      padding: "5px",
      width: "30px", 
      textAlign: "center", 
      display: "inline-block", 
    };

    const className = clsx({
      wrongLetters : wrongGuessCount>8 && !isGuessed
    })
  
    return (
      <span key={index} className={className} style={styles}>
        {wrongGuessCount<=8 ? (isGuessed ? letter.toUpperCase() : "") : letter.toUpperCase()}
      </span>
    );
  });


  function newGame(){
    setGuessedLetter([])
    setCurrentWord(() => generate({ maxLength: 6}))

  }

  function giveHint(){
    alert("Starts with " +currentWord[0])
  }

  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount
    const styles ={
        background: lang.backgroundColor,
        color: lang.color
    }

    const className = clsx({
      chip:true,
      lost: isLanguageLost
    })
    return (
      <span key={lang.name}
      className={className}
      style={styles}>
        {lang.name}
      </span>
    )
  })


  return (
    <>
    <header>
      <h1>Assembly: Endgame  <button 
      onClick={giveHint}
      className="hint" 
      title="click for a hint">
        hint?
        </button></h1> 
    </header>

    {wrongGuessCount <= 8 ? (
  isGameWon ? (
    <>
      <Confetti />
      <section className="game-won">
        <h2>You win!</h2>
        <p>Well done! 🎉</p>
      </section>
    </>
  ) :
  wrongGuessCount >=2 && wrongGuessCount <4 ? (
    <section className="bye-html">
      <span className="bye-html">Bye Bye HTML & CSS🥲</span>
    </section>
  ):wrongGuessCount >= 4 ? (
    <section className="bye-react">
      <span className="bye-react">Bye Bye JS & React 🥲</span>
    </section>
  ) : (
    <section className="game-status">
      <span className="game-status">
        Guess the word within 8 attempts to keep the programming word safe from Assembly!
      </span>
    </section>
  )
) : (
  <section className="game-lost">
    <h2>You Lost!</h2>
    <p>Better Luck Next Time! 😔</p>
  </section>
)}

   <section className="language-chips">
     {languageElements}
   </section>

   <section className="guess">
   {displayWord}
   </section>

   <section className="keyboard">
    {displayKeyboard}
   </section>

   <div className="button-container">
      {(isGameWon || wrongGuessCount >8) ? <button 
      onClick={newGame}
      className="new-game">
        New Game
      </button> : ""}
      <button
      onClick={reset}
       className="reset">
        Reset</button>
   </div>
  
    </>
  )
}

export default App
